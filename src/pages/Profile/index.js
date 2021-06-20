import { useState, useEffect } from "react";
import { Topbar } from "../../components/Topbar";
import { FormGroup, LabelError } from "../../globalStyles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { HTTP_VERBS, requestHttp } from "../../utils/HttpRequest";
import { USERS } from "../../constants/HttpEndpoints";
import { AlertForm, ICON } from "../../utils/SweetAlert";


export const Profile = ({ title }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [dataProfile, setDataProfile] = useState({});

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    }
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await requestHttp({
          method: HTTP_VERBS.GET,
          endpoint: USERS.profile,
        });
        setDataProfile(res.data);
      } catch (error) {
        AlertForm(`Error ${error.response.status}`, error.response.statusText || 'Error', ICON.ERROR);
      }
    }
    getProfile();
  }, [])
  const onSubmitUpdate = async (data) => {
    console.log('data form', data);
    setIsLoading(true);
    await updateProfile(data);
    setIsLoading(false);
  }

  const updateProfile = async (data) => {
    try {
      const res = await requestHttp({
        method: HTTP_VERBS.PUT,
        endpoint: USERS.profile,
        data,
      });
      AlertForm('Success Update Profile', res.data.message, ICON.SUCCESS);
    } catch (error) {
      AlertForm(`Error ${error.response.status}`, error.response.statusText || 'Error', ICON.ERROR);
    }
  }

  return (
    <>
      <Topbar title={title} />
      <h4>Update Profile</h4>
      <form autocomplete="off" onSubmit={handleSubmit(onSubmitUpdate)}>
        <FormGroup>
          <Input
            register={register}
            name="name"
            rules={{ required: true }}
            label="Name"
            type="text"
            placeholder="Enter your name"
            data={dataProfile.name}
          />
          {errors.name?.type === 'required' && <LabelError>Field required</LabelError>}
        </FormGroup>
        <FormGroup>
          <Input
            register={register}
            name="email"
            rules={{ required: true }}
            label="Email address"
            type="email"
            placeholder="Enter your email"
            data={dataProfile.email}
          />
          {errors.email?.type === 'required' && <LabelError>Field required</LabelError>}
        </FormGroup>
        <FormGroup>
          <Input
            register={register}
            name="password"
            rules={{ required: true, minLength: 6 }}
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password?.type === 'required' && <LabelError>Field required</LabelError>}
          {errors.password?.type === 'minLength' && <LabelError>Min Length 6 characters</LabelError>}
        </FormGroup>
        <Button
          disabled={!isValid}
          type="submit"
          text={isLoading ? 'Loading...' : 'Update Profile'} />
      </form>
    </>
  )
}