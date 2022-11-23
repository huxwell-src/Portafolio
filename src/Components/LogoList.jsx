import { Tooltip, Button } from "@material-tailwind/react";

export const LogoList = ({ logo }) => {
  return (
    <div className="2xl:w-[75%] w-full flex flex-wrap md:justify-end justify-evenly">
        {logo.map(logo =>(
            <Tooltip content={logo.title} >
                <a href={logo.link}  target="_blank" key={logo.id} >
                    <img src={logo.image} className="inline-block md:m-5 m-4"  width={100} />
                </a>
            </Tooltip>
        ))}
    </div>
  )
}
