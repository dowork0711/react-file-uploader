import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SNavWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: tomato;
    padding: 25px;
`;

const SNavItem = styled(Link)`
    font-size: 20px;
    font-weight: bold;
    margin-right: 25px;
    text-decoration: none;
    color: #fff;
`;

export default function Nav() {
    return (
        <SNavWrapper>
            <SNavItem to={"/"}>이미지 업로드</SNavItem>
            <SNavItem to={"/file_upload"}>파일 업로드</SNavItem>
        </SNavWrapper>
    );
}
