import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/models/auth";
import { auth } from "@/config/firebaseInit";
import { useAuthState } from "react-firebase-hooks/auth";

const About: NextPage = () => {
  const router = useRouter();
  const initUser = {uname: "def", email: "", priv: "", uid: ""};
  const [userInfo, setInfUserInfo] = useState(initUser);
  const [user, loading] = useAuthState(auth);
  console.log("auth from idx:", auth);
  console.log("user from idx:", user);
  useEffect(() => {
    async function upd() {
      if(!loading && user) {
        setInfUserInfo(await getUserInfo(user.uid));
      }
      else {
        setInfUserInfo(initUser);
      }
    }
    upd();
  }, [user]);

  return (
    <div>
        <p id="lbl_uname">Username: {userInfo.uname}</p>
        <p id="lbl_email">Email: {userInfo.email}</p>
        <p id="lbl_uid">UID: {userInfo.uid} </p>
        <p id="lbl_priv">Privilege: {userInfo.priv} </p>
        <form method="GET" action="/">  
            <button type="submit">Return to sender</button>
        </form>
    </div>
  );
};

export default About;