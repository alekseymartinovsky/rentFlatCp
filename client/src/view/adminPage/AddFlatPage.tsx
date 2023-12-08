import { useLocation } from "react-router";
import Header from "../../component/Header";
import CreateRentFlat from "./CreateRentFlat";

const AddFlatPage: React.FC = () => {
    const location = useLocation();

    return (
        <div>
            <Header back />
            <CreateRentFlat />
        </div>
    );
};

export default AddFlatPage;
