 
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { MdArrowForwardIos } from "react-icons/md";


const subjects = [
  "Maths",
  "Physics", 
  "Biology",
  "Chemistry",
  "English",
  "History",
  "Geography"
]

export default function SubjectGrid() {
  return (
    <section className="w-full px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-center text-[32px] font-semibold text-[#2D2D2D] mb-8 md:mb-12">
          Find online tutors in any subjects
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subjects?.map((subject) => (
            <Link 
              key={subject} 
              href={`https://experttutor.com/tutors?subject=${subject}&level=All+Levels`}
            >
              <Card className="group relative flex items-center justify-between p-6 transition-all hover:shadow-md bg-gradient-to-r from-[#F8F9FF] to-white">
                <span className="text-lg font-bold text-[#2D2D2D]">{subject}</span>
                <MdArrowForwardIos className="h-5 w-5 bg-[#4B6BFB] text-white rounded-full p-1 transition-transform group-hover:translate-x-1" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

