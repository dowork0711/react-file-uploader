import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
    ChangeEvent
} from "react";
import styled from "styled-components";

interface IFileTypes {
    id: number;
    object: File;
}

const SFileUploadWrapper = styled.div`
    padding: 7% 15%;
    box-sizing: border-box;
`;

const SCustomInput = styled.input`
    display: none;
`;

const SCustomLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SCustomFileDragWrapper = styled.div`
    width: 500px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px 15px;
    border-radius: 7px;
    cursor: pointer;
    margin: 0 0 20px 0;
    box-sizing: border-box;
    background-color: rgba(50, 111, 233, 0.5);
    color: #fff;
`;

const SFileListWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SFileListItemTitle = styled.div`
    font-size: 17px;
    font-weight: 700;
`;

const SXButton = styled.div`
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    margin-left: 25px;
`;

export default function FileUploader(): JSX.Element {
    const [files, setFiles] = useState<IFileTypes[]>([]);
    const fieldNum = useRef<number>(0);
    const dragRef = useRef<HTMLLabelElement | null>(null);
    const [fileDrag, setFileDrag] = useState<boolean>(false);

    const onChangeFiles = useCallback(
        (e: ChangeEvent<HTMLInputElement> | any): void => {
            let dragFiles: File[] = [];
            let tempFiles: IFileTypes[] = files;

            if (e.type === "drop") {
                dragFiles = e.dataTransfer.files;
            } else {
                dragFiles = e.target.files;
            }

            for (let file of dragFiles) {
                tempFiles = [
                    ...tempFiles,
                    {
                        id: fieldNum.current++,
                        object: file
                    }
                ];
            }
            setFiles(tempFiles);
        },
        [files]
    );

    const fileHandler = useCallback(
        (id: number): void => {
            setFiles(files.filter((file: IFileTypes) => file.id !== id));
        },
        [files]
    );

    const onDragDrop = useCallback(
        (e: DragEvent): void => {
            e.preventDefault();
            e.stopPropagation();

            onChangeFiles(e);
            setFileDrag(false);
        },
        [onChangeFiles]
    );

    const onDragInFile = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const onDragOutFile = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        setFileDrag(false);
    }, []);

    const onDragOverFile = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        // @ts-ignore
        if (e.dataTransfer.files) {
            setFileDrag(true);
        }
    }, []);

    const initFileDrag = useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", onDragInFile);
            dragRef.current.addEventListener("dragleave", onDragOutFile);
            dragRef.current.addEventListener("dragover", onDragOverFile);
            dragRef.current.addEventListener("drop", onDragDrop);
        }
    }, [onDragInFile, onDragOutFile, onDragOverFile, onDragDrop]);

    const resetFileDrag = useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", onDragInFile);
            dragRef.current.addEventListener("dragleave", onDragOutFile);
            dragRef.current.addEventListener("dragover", onDragOverFile);
            dragRef.current.addEventListener("drop", onDragDrop);
        }
    }, [onDragInFile, onDragOutFile, onDragOverFile, onDragDrop]);

    useEffect(() => {
        initFileDrag();
        return () => resetFileDrag();
    }, [initFileDrag, resetFileDrag]);

    return (
        <SFileUploadWrapper>
            <SCustomInput
                type="file"
                multiple={true}
                onChange={onChangeFiles}
                id="fileUpload"
                style={{ display: "none" }}
            />

            <SCustomLabel htmlFor="fileUpload" ref={dragRef}>
                <SCustomFileDragWrapper>
                    클릭하거나 드래그하여 파일 첨부
                </SCustomFileDragWrapper>
            </SCustomLabel>
            {files.length > 0 &&
                files.map((file: IFileTypes) => {
                    const {
                        id,
                        object: { name }
                    } = file;

                    return (
                        <SFileListWrapper key={id}>
                            <SFileListItemTitle>{name}</SFileListItemTitle>
                            <SXButton onClick={() => fileHandler(id)}>
                                X
                            </SXButton>
                        </SFileListWrapper>
                    );
                })}
        </SFileUploadWrapper>
    );
}
