export const LogoList = ({ logo }) => {
  return (
    <div className="w-[75%] m-auto">
        {logo.map(logo =>(
                <a href={logo.link}  target="_blank" >
                    <img src={logo.image} className="inline-block m-5"  width={100} />
                </a>
        ))}
    </div>
  )
}
