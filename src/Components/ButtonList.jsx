export const ButtonList = ({categories, filterCategory}) => {
  return (
    <div className="categories mx-2 md:mx-0">
        {categories.map(category => (
            <button
                key={category}
                onClick ={()=> filterCategory(category)}
                className= "bg-gray md:mx-4 mx-0.5 px-6  mt-4 rounded-full h-10 text-light-blue font-semibold focus:bg-light-blue focus:text-gray focus:shadow-lg hover:shadow-md transition-all duration-200 ">
                {category}
            </button>
        ) )}
    </div>
  )
}
