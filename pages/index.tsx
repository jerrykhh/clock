/* eslint-disable @next/next/no-img-element */
import Layout from '../components/Layout'
import Clock from '../components/clock'
import { useRef, useEffect, useState } from 'react'

const Index = () => {

  const [timezons, setTimezons] = useState([
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    "Japan"
  ])
  const topLayerRef = useRef(new Array(timezons.length));
  const clockElements = useRef(new Array(timezons.length));
  const timeZoneImages = useRef(new Array(timezons.length))


  // const [bgImage, setBgImage] = useState({
  //   current: null,
  //   target: null
  // })

  const calElementLocation = () => {
    const height = window.innerHeight;
    timezons.map((_, index) => {
      console.log(index, topLayerRef)
      topLayerRef.current[index].style.height = `${height / timezons.length}px`;
      timeZoneImages.current[index].children[0].style.maxHeight = `${height / timezons.length}px`;
      const timeZoneImageHeight = timeZoneImages.current[index].clientHeight;
      const currentTimeHeight = clockElements.current[index].clientHeight;
      clockElements.current[index].style.top = `${(timeZoneImageHeight / 2) - currentTimeHeight / 2}px`
    })
  }


  useEffect(() => {
    // fetch(`api/timezone?${Intl.DateTimeFormat().resolvedOptions().timeZone}`).then((data) => {
    //   const res = JSON.stringify(data.text)

    // });
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    calElementLocation()
    window.addEventListener("resize", calElementLocation)
    return () => {
      window.removeEventListener("resize", calElementLocation)
    };
  }, []);

  return (

    <Layout>
      <div className="flex-col">
        {
          timezons.map((timezone, index) => {
            return (
              <>
                <div className="md:flex items-center justify-center m-0 p-0 top-0 ," ref={el => topLayerRef.current[index] = el}>
                  <div className="border-black border-b w-full md:absolute z-0  "></div>
                  <div className="z-20 absolute" ref={el => timeZoneImages.current[index] = el}>
                    <img src={`${(index==0)?"https://images.chinahighlights.com/allpicture/2019/11/135e01ded864418d8f699bec_cut_800x500_117.jpg": "https://live.staticflickr.com/8265/28350408591_33df20c0d7_b.jpg"}`} alt="" className="object-scale-down w-4xl max-w-3xl min-w-0 sm:object-fill" />

                    <div className={(index%2==0)?"absolute lg:-left-36": "absolute lg:-right-36"} ref={el => clockElements.current[index] = el}>
                      <div className="static lg:flex justify-between">
                        {
                          (index % 2 != 0) ?
                            <>
                              <div className="self-center-p8">
                                <div className="uppercase tracking-wide text-white font-semibold text-4xl">{timezone}</div>
                              </div>
                              <div className="md:self-center">
                                <Clock
                                  options={
                                    {
                                      hour12: false,
                                      timeZone: timezone
                                    }
                                  }
                                />
                              </div>
                            </>
                            :
                            <>
                              <div className="md:self-center">
                                <Clock
                                  options={
                                    {
                                      hour12: false,
                                      timeZone: timezone
                                    }
                                  }
                                />
                              </div>
                              <div className="self-center-p8">
                                <div className="uppercase tracking-wide text-white font-semibold text-4xl">{timezone}</div>
                              </div>
                            </>
                        }


                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }


      </div>

     


    </Layout>
  )

}


export default Index
