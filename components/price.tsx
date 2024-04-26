import {useState} from "react";
import Colors from "@/constants/colors";


const Price = ({ price , type, setcolor}) => {
    let color = "#000000"

    if (type === "$") {
        if (setcolor) {
            if (price > 0.05){
                color = Colors.successColor;
            } else if (price < -0.05){
                color = Colors.dangerColor;
            }
        }
        if (price < 0) {
            return (
                <div
                    style={{color: color}}
                >
                    -${Math.abs(price)}
                </div>
            );
        }
        return (
            <div
                style={{color: color}}
            >
                ${price}
            </div>
        );
    }

    if (setcolor) {
        if (price > 1){
            color = Colors.successColor;
        } else if (price < -1){
            color = Colors.dangerColor;
        }
    }

    return (
        <div
            style={{color: color}}
        >
            {price}%
        </div>
    );
}
export default Price;