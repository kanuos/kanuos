import axios from "axios";
import { useState } from "react";
import { API_ROUTES, PROFILE_FIELDS } from "../../utils/admin";
import { StringField, ObjectArrayStepInput, ObjectHybrid } from "./InputField";

export const ProfileComponent = ({ admin }) => {
  const [init, setInit] = useState(admin);


  const handleUpdateProfile = async function () {
      try {
        const { data, error } = (
          await axios({
            url: API_ROUTES.profile,
            method: "patch",
            withCredentials: true,
            data: init,
          })
        ).data;

        if (error) {
          throw data;
        }

        alert('Success!')

      } 
      catch (error) {
        alert(error);
      }
    }

  return (
    <>
      <p className="text-xs text-secondary capitalize text-center font-semibold">
        admin
      </p>
      <h1 className="font-special capitalize text-center text-5xl font-black mb-10">
        update profile
      </h1>
      <section className="w-full mx-auto max-w-3xl relative after:absolute after:left-4 after:h-full after:bg-primary after:w-0.5 after:top-0 after:z-0">
        <div className="w-full relative z-10 flex flex-col gap-y-10">
          {PROFILE_FIELDS.map((field, i) => {
            const { key, type } = field;
            if (type === "string") {
              return (
                <StringField
                  key={i}
                  name={key}
                  value={init[key]}
                  setValue={({k, v}) => setInit(prev => ({...prev, [k] : v}))}
                />
              );
            }

            if (type === "objArr") {
              return (
                <ObjectArrayStepInput
                  key={i}
                  layout={field.layout} 
                  name={key}
                  init={init[key]}
                  setValue={({value}) => setInit(prev => ({...prev, [key] : value}))}
                />
              );
            }

            if (type === "objHybrid") {
              return (
                <ObjectHybrid
                  key={i}
                  name={key}
                  layout={field.layout}
                  init={init[key]}
                  getData={value => setInit(prev => ({...prev, [key] : [...value]}))}
                />
              );
            }
            
          })}
        </div>
      </section>
      <button onClick={handleUpdateProfile}
      className="capitalize text-xs w-max mx-auto rounded flex items-center justify-center relative overflow-hidden cursor-pointer transition-all my-10">
      <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
          Update profile
      </span>
      <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
    </button>
    </>
  );
};
