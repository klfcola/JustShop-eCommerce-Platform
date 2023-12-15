import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value, text }) => {
    return (
        <div className="rating-area">
            <span>
                {value >= 1 ? (
                    <FaStar className="gold-star" />
                ) : value >= 0.5 ? (
                    <FaStarHalfAlt className="gold-star" />
                ) : (
                    <FaRegStar className="gold-star" />
                )}
                {value >= 2 ? (
                    <FaStar className="gold-star" />
                ) : value >= 1.5 ? (
                    <FaStarHalfAlt className="gold-star" />
                ) : (
                    <FaRegStar className="gold-star" />
                )}
                {value >= 3 ? (
                    <FaStar className="gold-star" />
                ) : value >= 2.5 ? (
                    <FaStarHalfAlt className="gold-star" />
                ) : (
                    <FaRegStar className="gold-star" />
                )}
                {value >= 4 ? (
                    <FaStar className="gold-star" />
                ) : value >= 3.5 ? (
                    <FaStarHalfAlt className="gold-star" />
                ) : (
                    <FaRegStar className="gold-star" />
                )}
                {value >= 5 ? (
                    <FaStar className="gold-star" />
                ) : value >= 4.5 ? (
                    <FaStarHalfAlt className="gold-star" />
                ) : (
                    <FaRegStar className="gold-star" />
                )}
            </span>
            <span>{text && text}</span>
        </div>
    );
};

export default Rating;
