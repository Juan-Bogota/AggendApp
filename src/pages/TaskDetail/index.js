import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Topbar } from "../../components/Topbar";
import { getAllStatus, getStatusById } from "../../constants/TaskStatus";
import { timeLeftFromNow } from "../../utils/DateFormats";
import { HTTP_VERBS, requestHttp } from "../../utils/HttpRequest";
import { TaskDescription, TaskFooter, TaskDueDate, TaskResponsable, TaskStatusLabel, TaskTitle } from "./styles";
import Select from 'react-select';
import { AlertForm, ICON } from "../../utils/SweetAlert";
import { FaRegClock } from "react-icons/fa";
import moment from 'moment';

export const TaskDetail = ({title}) => {

  const [detailTaskId, setDetailTaskId] = useState({});
  const [statusTask, setStatusTask] = useState([]);
  const [valueTask, setValueTask] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [statusTaskValue, setStatusTaskValue] = useState('');

  const history = useHistory();
  const { id } = useParams();

  const renderStatus = (id = 0) => {
    const status = getStatusById(id);
    return <TaskStatusLabel color={status.color}>{status.name}</TaskStatusLabel>
  }

  useEffect(() => {
    setStatusTask(getAllStatus());
  }, [])


  useEffect(() => {
    if (!id) return;
    const getDetailTask = async () => {
      try {
        const { data: detailTask } = await requestHttp({
          endpoint: `tasks/${id}`,
        });
        setDetailTaskId(detailTask);
      } catch (error) {
        console.log(error)
        setErrorMessage('Error al buscar detalle de esta tarea');
      }
    }
    getDetailTask();
  }, [id])

  useEffect(() => {
    if (!Object.keys(detailTaskId).length) return;
    const status = getStatusById(detailTaskId.status);
    setValueTask({ value: status.id, label: status.name });
    setStatusTaskValue(renderStatus(detailTaskId.status));
  }, [detailTaskId])

  useEffect(() => {
    if (!valueTask || !detailTaskId._id) return;
    const updateValueTask = async () => {
      try {
        const { data: updateTask } = await requestHttp({
          method: HTTP_VERBS.PUT,
          endpoint: `tasks/status/${detailTaskId._id}`,
          params: { status: valueTask.value }
        });
        AlertForm(updateTask.message, '', ICON.SUCCESS);
        setStatusTaskValue(renderStatus(valueTask.value));
      } catch (error) {
        AlertForm(error.response.statusText, 'Error al actualizar', ICON.ERROR);
      }
    }
    if (detailTaskId.status !== valueTask.value) updateValueTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueTask])

  const updateStatus = (e) => {
    setValueTask(e);
  }
  const goBackApp = () => {
    history.goBack();
  }


  return (
    <Fragment>
      <Topbar isBackVisible={true} onPress={goBackApp} title={title} />
      {statusTaskValue}
      <TaskTitle>{detailTaskId.title} {errorMessage}</TaskTitle>
      <TaskDescription>{detailTaskId.description}</TaskDescription>
      <div>
        <Select
          className="basic-single"
          classNamePrefix="select"
          value={valueTask}
          onChange={updateStatus}
          name="status"
          options={statusTask}
        />
      </div>
      <TaskFooter>
        <TaskDueDate><FaRegClock />{' '}{timeLeftFromNow(detailTaskId.due_date)}</TaskDueDate>
        <TaskResponsable>{detailTaskId.responsible?.name}</TaskResponsable>
      </TaskFooter>

      <details>
        <summary>More Info</summary>
        <p><b>Responsible: </b> {detailTaskId.responsible?.name} </p>
        <p><b>Collaborators: </b>  {detailTaskId.collaborators?.map((el) => (el.name)).join(', ')} </p>
        <p><b>Created At: </b>{moment(detailTaskId.createdAt).format('LLLL')} </p>
        <p><b>Update At: </b>{moment(detailTaskId.updatedAt).format('LLLL')}</p>
      </details>
    </Fragment>
  );
};
