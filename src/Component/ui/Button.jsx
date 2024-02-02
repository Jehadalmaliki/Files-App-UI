import clsx from "clsx";
import { useState } from "react";

function Button(props) {
    const {
        imgClass,
        imgSrc,
        content,
        size = "large",
        filled = "true",
        textTransform = "capitalize",
        fontSize = "xl",
        radius = "6px",
        shadow = "",
        onClick = () => {},
        disabled = false,
        useConfirm = false,
        yesText = "yes",
        noText = "no",
        interaction = "transform hover:bg-yellow transition duration-500  hover:animate-bounce hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan",
    } = props;

    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = (e) => {
        if (useConfirm) {
            setShowTooltip(true);
        }
        if (!useConfirm) onClick(e);
    };

    const handleConfirm = (e) => {
        onClick(e);
        setShowTooltip(false);
    };

    return (
        <div className='relative self-center'>
            <button
                disabled={disabled}
                onClick={(e) => handleClick(e)}
                className={clsx(
                    `${interaction}
                font-normal whitespace-nowrap  cursor-pointer ${shadow} ${textTransform} ${fontSize} rounded-${radius}`,
                    {
                        "px-[10px] lg:px-[28px] py-[4.7px]": size === "small",
                        "px-[15px] md:px-[25px] lg:px-[35px] py-[7px]":
                            size === "medium",
                        "px-[25px] md:px-[35px] py-[8px] font-medium":
                            size === "large",
                        "bg-cyan text-black ": filled === "true",
                        " text-cyan": filled === "false",
                        "bg-light-gray text-gray": disabled === true,
                    }
                )}
            >
               <div style={{ display: 'flex', alignItems: 'center' }}>
        {imgSrc && <img src={imgSrc} alt="" className="w-12 h dark:text-gray-100 mr-2"  />} {/* Apply the provided class */}
        <span style={{ textTransform, fontSize }}>{content}</span>
      </div>
            </button>
            {useConfirm && showTooltip && (
                <div
                    className='absolute -bottom-14 p-2 bg-white rounded-md shadow-md px-3 py-2 text-sm font-medium text-white self-center lg:self-center'
                    data-aos='zoom-in'
                    data-aos-duration='100'
                >
                    <div className='flex'>
                        <button
                            onClick={(e) => handleConfirm(e)}
                            className='bg-red text-white px-4 py-1 rounded-md'
                        >
                            {yesText}
                        </button>
                        <button
                            onClick={() => setShowTooltip(false)}
                            className='bg-gray text-white px-4 py-1 rounded-md ml-2'
                        >
                            {noText}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Example of using
/* <Button
content='book an appointment'
textTransform='uppercase'
filled='true'
size='large'
fontSize='text-lg md:text-xl lg:text-2xl'
radius='md'
/> */
export default (Button);
