# React File Uploader 구현

## 목표
- 라이브러리를 사용하지 않고 브라우저를 통해 파일을 업로드 할 수 있는 기능을 구현함.
- 이미지 업로더는 버튼을 클릭하여 파일 탐색기 작동 후 이미지를 바로 가져와서 보여주도록 구현.
- 파일 업로더는 업로드시 목록으로 파일명과 지우기 버튼을 보여주도록 구현.

<br>
<br>

## 이미지 업로더

### 초기화면 및 삭제시
![image](https://user-images.githubusercontent.com/76569564/166873744-aeda5a41-d964-4559-a19e-73288d821c29.png)

### 첨부시
![image](https://user-images.githubusercontent.com/76569564/166873871-6203b6ac-cd01-42ba-a15c-0c48ce092a41.png)

## 파일 업로더

### 초기화면 및 삭제시
![image](https://user-images.githubusercontent.com/76569564/166873918-88effab6-bc3b-4e9a-9c38-15cd7e82f5b0.png)

### 첨부시
![image](https://user-images.githubusercontent.com/76569564/166873947-96023069-60b2-42ad-af59-3b4a0d413413.png)

<br>
<br>

## 이미지 업로더 주요 로직

```typescript
export default function ImageUploader() {
    const [imageFile, setImageFile] = useState<string | any>({
        imageFile: "",
        viewUrl: ""
    });   // 업로드 하는 이미지 파일에 대한 정보

    const [loaded, setLoaded] = useState<boolean>(false);   // 이미지가 업로드 되어있을 때, 그렇지 않을 때

    let imageRef: any;  // ref 요소를 위한 임시 변수

    const onChangeUploadHandler = (e: any): void => {
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
    };  // 업로드시 onChange

    const onClickDeleteHandler = (): void => {
        console.log("사진 삭제 버튼 클릭");
        setImageFile({
            imageFile: "",
            viewUrl: ""
        });
    };  // 삭제 버튼 클릭시 이미지 정보 초기화

    return (
        // ...
    );
}
```

<br>
<br>

## 파일 업로더 주요 로직

```typescript
export default function FileUploader(): JSX.Element {
    const [files, setFiles] = useState<IFileTypes[]>([]); // 업로드한 파일을 저장할 배열
    const fieldNum = useRef<number>(0);   // 필드 번호 참조
    const dragRef = useRef<HTMLLabelElement | null>(null);  // 드래그 영역 참조
    const [fileDrag, setFileDrag] = useState<boolean>(false); // 드래그 이벤트 적용시

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
    );  // 파일 업로드시 onChange

    const fileHandler = useCallback(
        (id: number): void => {
            setFiles(files.filter((file: IFileTypes) => file.id !== id));
        },
        [files]
    );  // 파일 반환

    const onDragDrop = useCallback(
        (e: DragEvent): void => {
            e.preventDefault();
            e.stopPropagation();

            onChangeFiles(e);
            setFileDrag(false);
        },
        [onChangeFiles]
    );  // 드래그 드롭 이벤트

    const onDragInFile = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    }, []); // 드래그 인 이벤트

    const onDragOutFile = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        setFileDrag(false);
    }, []); // 드래그 아웃 이벤트

    const onDragOverFile = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        // @ts-ignore
        if (e.dataTransfer.files) {
            setFileDrag(true);
        }
    }, []); // 드래그 오버 이벤트

    const initFileDrag = useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", onDragInFile);
            dragRef.current.addEventListener("dragleave", onDragOutFile);
            dragRef.current.addEventListener("dragover", onDragOverFile);
            dragRef.current.addEventListener("drop", onDragDrop);
        }
    }, [onDragInFile, onDragOutFile, onDragOverFile, onDragDrop]);    // 컴포넌트 마운트시

    const resetFileDrag = useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", onDragInFile);
            dragRef.current.addEventListener("dragleave", onDragOutFile);
            dragRef.current.addEventListener("dragover", onDragOverFile);
            dragRef.current.addEventListener("drop", onDragDrop);
        }
    }, [onDragInFile, onDragOutFile, onDragOverFile, onDragDrop]);    // 컴포넌트 언마운트시

    useEffect(() => {
        initFileDrag();
        return () => resetFileDrag();
    }, [initFileDrag, resetFileDrag]);

    return (
        // ...
    );
}
```
