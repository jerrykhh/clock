/* eslint-disable @next/next/no-img-element */
import Layout from '../components/Layout'
import Clock from '../components/clock'
import { useRef, useEffect, useState } from 'react'

const Index = () => {

  const topRef = useRef(null);
  const timeZoneImage = useRef(null);
  const currentTime = useRef(null);
  const [timezons, setTimezons] = useState([
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ])


  // const [bgImage, setBgImage] = useState({
  //   current: null,
  //   target: null
  // })

  const calElementLocation = () => {
    const height = window.innerHeight;
    topRef.current.style.height = `${height/timezons.length}px`;
    const timeZoneImageHeight = timeZoneImage.current.clientHeight;
    const currentTimeHeight = currentTime.current.clientHeight;
    currentTime.current.style.top = `${(timeZoneImageHeight / 2) - currentTimeHeight / 2}px`
  }


  useEffect(() => {
    // fetch(`api/timezone?${Intl.DateTimeFormat().resolvedOptions().timeZone}`).then((data) => {
    //   const res = JSON.stringify(data.text)

    // });
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    calElementLocation()
    // changeSubScreenSize()
    window.addEventListener("resize", calElementLocation)
    // window.addEventListener("resize", changeSubScreenSize)
    return () => {
      window.removeEventListener("resize", calElementLocation)
      // window.removeEventListener("resize", changeSubScreenSize)
    };
  }, []);

  return (

    <Layout>
      <div className="md:flex items-center justify-center m-0 p-0 top-0 ," ref={topRef}>
        <div className="border-black border-b w-full md:absolute z-0  "></div>
        <div className="z-20 md:absolute" ref={timeZoneImage}>
          <img src="https://images.chinahighlights.com/allpicture/2019/11/135e01ded864418d8f699bec_cut_800x500_117.jpg" alt="" className="object-scale-down w-full max-w-4xl" />

          <div className="absolute lg:-left-36" ref={currentTime}>
            <div className="static lg:flex justify-between">
              <div className="md:self-center">
                <Clock
                  options={
                    {
                      hour12: false,
                      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                  }
                />
              </div>
              <div className="self-center-p8">
                <div className="uppercase tracking-wide text-white font-semibold text-4xl">{Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="fixed top-0 w-full h-full" ref={subScreenRef}>


    </div> */}

      {/* <div className="h-1/2  border-b border-black ">
      <div className="h-full bg-no-repeat bg-cover bg-center" >
      <div className="w-full h-1/2">
        <img src="https://images.chinahighlights.com/allpicture/2019/11/135e01ded864418d8f699bec_cut_800x500_117.jpg" alt="" className="object-scale-down w-full block"/>
      </div>

      <div className="md:flex justify-center h-full">
      <div className="self-center-p8">
        <Clock options={
            {
              hour12: false,
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
          }
        />
      </div>
      <div className="self-center-p8">
        <div className="uppercase tracking-wide text-white font-semibold text-4xl">{Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
        <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
        <p className="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
      </div>
      </div>
      
      </div>
    </div>
   */}


    </Layout>
  )

}


export default Index