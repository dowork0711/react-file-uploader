import React, { useState } from "react";
import styled from "styled-components";

const SImageUploaderWrapper = styled.div`
    padding: 7% 15%;
    box-sizing: border-box;
`;

const SImageUploaderFrame = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #1e1e1e;
    padding: 15px 20px;
    flex-direction: column;
    box-sizing: border-box;
`;

const STitle = styled.div`
    font-size: 18px;
    color: #363636;
    text-align: center;
    padding: 50px 0 0 0;
    box-sizing: border-box;
`;

const SCustomButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
    box-sizing: border-box;
    flex-direction: column;
`;

const SCustomButton = styled.div<{ btnValue: string }>`
    text-align: center;
    width: 150px;
    padding: 10px 15px;
    border-radius: 7px;
    cursor: pointer;
    margin: 0 0 20px 0;
    box-sizing: border-box;
    background-color: ${({ btnValue }) =>
        btnValue === "primary" ? "rgb(50, 111, 233)" : "rgb(238, 134, 131)"};
    color: #fff;
`;

const SCustomInput = styled.input`
    display: none;
`;

const SImageWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const SImageArea = styled.img`
    width: inherit;
    height: inherit;
`;

const SLoading = styled.div`
    padding: 20px;
    text-align: center;
`;

export default function ImageUploader() {
    const [imageFile, setImageFile] = useState<string | any>({
        imageFile: "",
        viewUrl: ""
    });

    const [loaded, setLoaded] = useState(false);

    let imageRef: any;

    const onChangeUploadHandler = (e: any) => {
        console.log("사진 업로드 버튼 클릭");
        e.preventDefault();

        const fileReader = new FileReader();
        if (e.target.files[0]) {
            setLoaded(true);
            fileReader.readAsDataURL(e.target.files[0]);
        }
        fileReader.onload = () => {
            setImageFile({
                imageFile: e.target.files[0],
                viewUrl: fileReader.result
            });
            setLoaded(true);
        };

        console.log(imageFile.viewUrl);
        console.log(loaded);
    };

    const onClickDeleteHandler = () => {
        console.log("사진 삭제 버튼 클릭");
        setImageFile({
            imageFile: "",
            viewUrl: ""
        });
    };

    return (
        <SImageUploaderWrapper>
            <SImageUploaderFrame>
                <STitle>이미지를 업로드 하려면 아래 버튼을 클릭</STitle>
                <SCustomButtonWrapper>
                    <SCustomButton
                        btnValue={"primary"}
                        onClick={() => imageRef.click()}
                    >
                        사진 업로드
                    </SCustomButton>
                    <SCustomButton
                        btnValue={"danger"}
                        onClick={onClickDeleteHandler}
                    >
                        사진 삭제
                    </SCustomButton>
                </SCustomButtonWrapper>
            </SImageUploaderFrame>
            <SImageWrapper>
                {imageFile.imageFile !== "" ? (
                    <SImageArea src={imageFile.viewUrl} />
                ) : (
                    <SLoading>Loading...</SLoading>
                )}
                <SCustomInput
                    type="file"
                    accept="image/*"
                    ref={(refer) => (imageRef = refer)}
                    onChange={onChangeUploadHandler}
                />
            </SImageWrapper>
        </SImageUploaderWrapper>
    );
}
