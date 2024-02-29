import { AxiosResponse } from "axios";
import React from "react";

import { UserInfo } from "@/app/api/admin/userinfo/utils";
import { OutingAndMealData, OutingGetResponse, defaultOutingData } from "@/app/api/outing/utils";
import OutingOption from "@/app/outing/outingOption";
import instance from "@/utils/instance";

const Outing = ({
  loading,
  setLoading,
  selectedUser,
  setSelectedUser,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: UserInfo;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserInfo>>;
}) => {
  const [sat, setSat] = React.useState<OutingAndMealData>(defaultOutingData);
  const [sun, setSun] = React.useState<OutingAndMealData>(defaultOutingData);

  React.useEffect(() => {
    getOutingData();
  }, []);

  const getOutingData = async () => {
    setLoading(true);
    try{
      const res: AxiosResponse<OutingGetResponse> = await instance.post(
        "/api/admin/outing",
        { owner: selectedUser.id }
      );
      setSat(res.data.data.sat);
      setSun(res.data.data.sun);
    }
    catch(e: any){
      alert(e.response.data.message);
    }
    setLoading(false);
  };

  const putOutingData = async () => {
    setLoading(true);
    try{
      const res = await instance.put("/api/admin/outing", {
        owner: selectedUser.id,
        sat, sun,
      });
      await getOutingData();
      alert(res.data.message);
    }
    catch(e: any){
      alert(e.response.data.message);
    }
    setLoading(false);
  };

  return (
    <article className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">외출 수정하기</h1>
      <section className="flex flex-col gap-3">
        {/* <h1 className="text-xl font-semibold">외출 및 급식 변경 신청하기</h1> */}
        <OutingOption
          title="토요일"
          data={sat}
          setData={setSat}
          loading={loading}
        />
        <OutingOption 
          title="일요일"
          data={sun}
          setData={setSun}
          loading={loading}
        />
      </section>
      <button 
        className="bg-primary text-white w-full text-base font-semibold rounded h-10"
        onClick={putOutingData}
      >
        수정하기
      </button>
    </article>
  );
};

export default Outing;