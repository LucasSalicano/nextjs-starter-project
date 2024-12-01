'use client';
import classes from './image-picker.module.css';
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState(null)
    const imageInput = useRef();

    function pickImageHandler() {
        imageInput.current.click();
    }

    function imageChangeHandler(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>no image picked yet.</p>}
                    {pickedImage &&
                        (
                            <Image
                                src={pickedImage}
                                alt="Picked Image"
                                fill
                            />
                        )
                    }
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id="image"
                    name={name}
                    accept=".jpg,.png,.jpeg"
                    ref={imageInput}
                    onChange={imageChangeHandler}
                    required
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={pickImageHandler}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}