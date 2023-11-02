import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTableById, editTableRequest } from "../../../redux/tablesRedux";
import { FormLabel, FormSelect, FormControl, Button, Spinner } from "react-bootstrap";

const TablesEdit = () => {
  const { id } = useParams();
  const singleTable = useSelector(state => getTableById(state, id));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    status: 'Free',
    peopleAmount: 0,
    maxPeopleAmount: 0,
    bill: 0,
    isBillVisible: false
  });

  useEffect(() => {
    if (singleTable) {
      setFormData(prevState => ({
        ...prevState,
        status: singleTable.status,
        peopleAmount: singleTable.peopleAmount,
        maxPeopleAmount: singleTable.maxPeopleAmount,
        bill: singleTable.bill,
        isBillVisible: singleTable.status === "Busy"
      }));
    } 
    
    if (!singleTable) {
      navigate('/');
      return;
    }
  }, [singleTable, navigate]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    let newPeopleAmount = 0;
  
    if (newStatus === "Cleaning" || newStatus === "Free") {
      newPeopleAmount = 0;
    } else {
      newPeopleAmount = formData.peopleAmount;
    }
  
    setFormData(prevState => ({
      ...prevState,
      status: newStatus,
      peopleAmount: newPeopleAmount,
      isBillVisible: newStatus === "Busy"
    }));
  };

  const handlePeopleAmountChange = (e) => {
    let newPeopleAmount = parseInt(e.target.value, 10);
    newPeopleAmount = isNaN(newPeopleAmount) ? 0 : newPeopleAmount;
    newPeopleAmount = Math.max(0, Math.min(newPeopleAmount, formData.maxPeopleAmount));
    setFormData(prevState => ({
      ...prevState,
      peopleAmount: newPeopleAmount
    }));
  };

  const handleMaxPeopleAmountChange = (e) => {
    let newMaxPeopleAmount = parseInt(e.target.value, 10);
    newMaxPeopleAmount = isNaN(newMaxPeopleAmount) ? 0 : newMaxPeopleAmount;
    newMaxPeopleAmount = Math.min(newMaxPeopleAmount, 10);
    const newPeopleAmount = Math.min(formData.peopleAmount, newMaxPeopleAmount);
  
    setFormData(prevState => ({
      ...prevState,
      maxPeopleAmount: newMaxPeopleAmount,
      peopleAmount: newPeopleAmount
    }));
  };

  const handleBillChange = (e) => {
    let newBill = parseFloat(e.target.value);
    newBill = isNaN(newBill) ? 0 : newBill;
    setFormData(prevState => ({
      ...prevState,
      bill: newBill
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedTable = {
      id,
      status: formData.status,
      peopleAmount: formData.peopleAmount,
      maxPeopleAmount: formData.maxPeopleAmount,
      bill: formData.bill,
    };

    dispatch(editTableRequest(editedTable));
    navigate('/');
  };

  if (!singleTable) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='my-3'>
        <p>Table {singleTable.id}</p>
      </h1>
      <div className='mt-4 d-flex w-50 align-items-center'>
        <FormLabel className='mb-0 me-3'>
          <strong>Status:</strong>
        </FormLabel>
        <FormSelect value={formData.status} onChange={handleStatusChange} className='w-25'>
          <option value='Free'>Free</option>
          <option value='Reserved'>Reserved</option>
          <option value='Busy'>Busy</option>
          <option value='Cleaning'>Cleaning</option>
        </FormSelect>
      </div>
      <div className='mt-4 d-flex w-25 align-items-center'>
        <FormLabel className='mb-0 me-2'>
          <strong>People:</strong>
        </FormLabel>
        <FormControl type="text" value={formData.peopleAmount} className='w-25 text-center' onChange={handlePeopleAmountChange} />
        <p className='mx-2 mb-0'>/</p>
        <FormControl type="text" value={formData.maxPeopleAmount} className='w-25 text-center' onChange={handleMaxPeopleAmountChange} />
      </div>
      {formData.isBillVisible && (
        <div className="mt-4 d-flex w-25 align-items-center">
          <FormLabel className="mb-0 me-4">
            <strong>Bill:</strong>
          </FormLabel>
          <p className="me-1 mb-0">$ </p>
          <FormControl type="text" value={formData.bill} className="w-25 text-center" onChange={handleBillChange} />
        </div>
      )}
      <Button type="submit" className="mt-4">
        Update
      </Button>
    </form>
  );
};

export default TablesEdit;