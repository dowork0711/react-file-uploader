import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import FileUploader from "./FileUploader";
import Nav from "./Nav";
import "./styles.css";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path={"/"} element={<ImageUploader />} />
                    <Route path={"/file_upload"} element={<FileUploader />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
