import { useEffect, useState } from "react"
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Tabs } from "./Tabs";
import { getItemToLocalStorage, defaultDataCurrentTabSettings, notifications, setItemToLocalStorage, validate_sound } from "../lib/helper";

import clock from '../assets/images/clock.svg';
import useSound from 'use-sound';
import Tab from "../assets/sounds/tab.mp3";
import { Toaster } from "react-hot-toast";
import { Tasks } from "./Tasks";
import { Transition } from "@headlessui/react";
import { SwitchShowTasks } from "./SwitchShowTasks";
import { MainFadeInDownContent, DivFadeInContent } from "./animations/genericAnimations";

export function PomoTimer() {
  const [playSound] = useSound(Tab);
  console.log(getItemToLocalStorage('dataCurrentTab') || JSON.stringify(defaultDataCurrentTabSettings))
  const [ currentTab, setCurrentTab ] = useState<number>(JSON.parse(getItemToLocalStorage('dataCurrentTab') || JSON.stringify(defaultDataCurrentTabSettings)).currentTab);
  const [ showTasks, setShowTasks ] = useState<boolean>(JSON.parse(getItemToLocalStorage('showTasks') || 'false'));
  
  useEffect(() => {
    setTimeout(() => notifications.requestPermission(), 2000);
  }, []);

  useEffect(() => {
    setItemToLocalStorage('showTasks', JSON.stringify(showTasks));
    validate_sound(() => playSound());
  }, [showTasks]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className={`bg-tab${currentTab == 0 ? "Main" : (currentTab == 1 ? "ShortTime" : "LongTime")} relative overflow-hidden w-screen h-screen flex align-center flex-col justify-between font-mPlus font-w text-md transition-colors duration-1000 select-none`}>
        <Header title="PomoTimer" currentTab={currentTab}/>
        <MainFadeInDownContent 
          className="w-full h-full flex flex-col items-center justify-start z-10 pt-8 scrollbar-def hover:scrollbar-thumb-gray-100 overflow-x-hidden"
        >
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab}/>
          <SwitchShowTasks showTasks={showTasks} setShowTasks={setShowTasks}/>
          <Transition
            show={showTasks}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            className="w-full flex items-center justify-center"
          >
            <Tasks currentTab={currentTab}/>
          </Transition>
        </MainFadeInDownContent>
        <Footer/>
        <DivFadeInContent>
          <img src={clock} alt="Relógio analógico" width="512" height="512" className="absolute w-[100vw] h-[100vh] bottom-[-45vh] left-[-40vw] opacity-20 -z-9" />
          <img src={clock} alt="Relógio analógico" width="512" height="512" className="absolute w-[100vw] h-[100vh] top-[-45vh] right-[-40vw] opacity-20 -z-9" />
        </DivFadeInContent>
      </section>
    </>
  );
}