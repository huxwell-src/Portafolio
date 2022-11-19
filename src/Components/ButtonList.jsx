export const ButtonList = ({categories, filterCategory}) => {
  return (
    <div className="categories">
        {categories.map(category => (
            <button
                key={category}
                onClick ={()=> filterCategory(category)}
                className= "bg-gray mx-4 px-6  mt-4 rounded-full h-10 text-light-blue font-semibold focus:bg-light-blue focus:text-gray focus:shadow-lg hover:shadow-md transition-all duration-200 ">
                {category}
            </button>
        ) )}
    </div>
  )
}
