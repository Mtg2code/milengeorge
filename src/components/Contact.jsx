import React,{ useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"

import { styles} from "../styles"
import { EarthCanvas } from "./canvas"
import { SectionWrapper } from "../hoc"
import { slideIn } from "../utils/motion"



const Contact = () => {
  const formRef = useRef();
  
const [form, setForm] = useState({
  name: "",
  email: "",
  message: "",
});


const [loading, setLoading] = useState(false)

const handlechange = (e) => {
  const { target } = e 
  const {name, value} = e.target

  setForm({...form, [name]:value})

}

const handleSubmit = (e) => {
  e.preventDefault()
  setLoading(true)
 
  emailjs.send (
    'service_10zfiub', 
    'template_ktktcfi' ,
    {
      from_name: form.name,
      to_name: 'Milen',
      from_email: form.email,
      to_email: 'milentomgeorge@gmail.com',
      message: form.message,
    },
    '6VANfpGzDenX-9ctK',
    )

    .then(() => {
      setLoading(false)
      alert('Thank you. I will get back to you soon as possible.'); 
      setForm({
        name: "",
        email: "",
        message: "",
      })

    }, (error) => {
      setLoading(false)
      console.error(error)
      alert('Something Went wrong. Please try again')  
    }
    )


}

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div variants={slideIn('left', "tween",0.2,1)} className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Get In Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className=" flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input type="text" name="name" value={form.name} onChange={handlechange} placeholder="What's Your Name ?" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-small">

            </input>
          </label>

          <label className=" flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input type="text" name="email" value={form.email} onChange={handlechange} placeholder="What's Your email ?" className="bg-tertiary py-4 px-4 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-small">

            </input>
          </label>

          <label className=" flex flex-col">
            <span className="text-white font-medium mb-4">Message</span>
            <textarea  rows="7"  name="message" value={form.message} onChange={handlechange} placeholder="What's Do You Want To Say ?" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-small">

            </textarea>
          </label>
            <div className="flex flex-col items-center mt-5">
              <button type="submit" className="bg-tertiary mt-2 rounded-xl py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary">
                {loading? 'Sending Message...' : 'Send'}
              </button>
            </div>
         

        </form>
      </motion.div>

      <motion.div variants={slideIn('right', "tween",0.2,1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas/>

      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,"contact")