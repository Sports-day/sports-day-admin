'use client'
import {Avatar, Stack} from "@mui/material";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {imageFactory} from "@/src/models/ImageModel";

export default function ImageCreator() {
    const router = useRouter()
    // State to store the file
    const [file, setFile] = useState<File | null>(null);

    // State to store the base64
    const [base64, setBase64] = useState<string | null>(null);

    // When the file is selected, set the file state
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        setFile(e.target.files[0]);
    };

    // On click, clear the input value
    const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.value = "";
    };

    const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                if (typeof fileReader.result === 'string') {
                    // Split the data URL at the comma and take the second part (the actual Base64 data)
                    const base64Data = fileReader.result.split(",")[1];
                    resolve(base64Data);
                } else {
                    reject('FileReader result is not a string');
                }
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // On submit, upload the file
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            return;
        }

        // Convert the file to base64
        const base64 = await toBase64(file as File);

        setBase64(base64 as string);

        // You can upload the base64 to your server here
        await imageFactory().create({
            data: base64 as string,
            // attachment: imageBase64
        })
        router.push('/images')

        // Clear the states after upload
        setFile(null);
        setBase64(null);
    };

    return (
        <Stack
            spacing={1}
        >
            <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={onFileChange}
                    onClick={onClick}
                />
                <button type="submit">Upload</button>
            </form>
            {base64 && (
                <Avatar src={base64}/>
            )}
        </Stack>
    )
}
