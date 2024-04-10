import { UniqueIdentifier } from "@dnd-kit/core";

const Item = ({ id }: { id: UniqueIdentifier }) => {
    return (
        <div>
            {id}
        </div>
    );
};
export default Item;