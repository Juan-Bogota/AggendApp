import { Fragment, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Topbar } from "../../components/Topbar";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "./styles";
import { FormGroup, LabelError } from "../../globalStyles";
import { HTTP_VERBS, requestHttp } from "../../utils/HttpRequest";
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import { apiCreateTask } from "../../store";
import { Redirect, useHistory } from "react-router-dom";


export const CreateTask = ({ title }) => {

  const [usersList, setUsersList] = useState([]);
  const [usersFiltered, setUsersFiltered] = useState([]);

  const dispatch = useDispatch();
  const createTaskData = useSelector(state => state.createTask);
  const redirectData = useSelector(state => state.redirect);

  let history = useHistory();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: {
      errors,
      isValid
    }
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data: users } = await requestHttp({
          method: HTTP_VERBS.GET,
          endpoint: 'users',
        });
        setUsersList(
          users.map(el => ({ value: el._id, label: el.name }))
        );
      } catch (error) {
        setUsersList({ value: null, label: `Error ${error.response.statusText}` });
      }
    }
    getUsers();
  }, [])

  useEffect(() => {
    setUsersFiltered(usersList);
  }, [usersList]);

  useEffect(() => {
    console.log('task state from store', createTaskData);
  }, [createTaskData]);

  useEffect(() => {
    if (!watch("responsible")) return;
    const userSelected = watch("responsible");
    const userFilterList = usersList.filter(el => el.label !== userSelected.label);
    setUsersFiltered(userFilterList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("responsible")])

  const onSubmitCreate = (data) => {
    const sendData = {
      ...data,
      responsible: data.responsible.value,
      collaborators: data.collaborators.map(el => el.value),
      dueDateTask: moment(data.dueDateTask).format()
    }
    dispatch(apiCreateTask(sendData, history));
  };

  if (redirectData.path !== '') {
    return <Redirect to={{ pathname: redirectData.path }} />
  }

  return (
    <Fragment>
      <Topbar title={title} />
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <FormGroup>
          <label>Task title</label>
          <Input
            register={register}
            name="title"
            rules={{ required: true, minLength: 6 }}
            label="Task title"
            type="text"
            placeholder="Enter task title"
          />
          {errors.taskTitle?.type === 'required' && <LabelError>Field required</LabelError>}
          {errors.taskTitle?.type === 'minLength' && <LabelError>Min Length 6 characters</LabelError>}
        </FormGroup>

        <FormGroup>
          <label>Responsible</label>
          <Controller
            name="responsible"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select responsible"
                options={usersList}
              />
            )}
          />
          {errors.responsible && <LabelError>Field required</LabelError>}
        </FormGroup>

        <FormGroup>
          <label>Collaborators</label>
          <Controller
            name="collaborators"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder="Select collaborators"
                options={usersFiltered}
              />
            )}
          />
          {errors.collaborators && <LabelError>Field required</LabelError>}
        </FormGroup>
        <FormGroup>
          <label>Due Date</label>
          <div>
            <Controller
              name="due_date"
              control={control}
              defaultValue={new Date()}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker {...field} locale="en-EN" format="dd-MM-yy" />
              )}
            />
          </div>
          {errors.dueDateTask && <LabelError>Field required</LabelError>}
        </FormGroup>

        <FormGroup>
          <label>Description</label>
          <div>
            <Textarea
              {...register("description", { required: true })}
              rows="3"
              errors={errors.description}
            />
          </div>
          {errors.description && <LabelError>Field required</LabelError>}
        </FormGroup>
        <div>
          <Button disabled={!isValid || createTaskData.loading} type="submit" text={createTaskData.loading ? 'Loading...' : 'Create'} />
          {createTaskData.error && <LabelError> {createTaskData.error}</LabelError>}
        </div>
      </form>
    </Fragment>
  );
};
