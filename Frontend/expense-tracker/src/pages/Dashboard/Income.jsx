import React, { useState, useEffect } from "react";import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/Modal';
import { useUserAuth } from '../../hooks/useUserAuth';
import IncomeList from '../../components/Income/IncomeList';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import DeleteAlert from '../../components/DeleteAlert';
import { API_PATHS } from '../../utils/apiPaths';
const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);


  //Get All Income Datails
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {

        setIncomeData(response.data);

      }
    } catch (error) {

      console.log("Something Wents Wrong Please Try Again Later", error);

    } finally {

      setLoading(false);

    }
  };

  //Handle Add Income 
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validation checks
    if (!source.trim()) {
      toast.error('Source is required.');
      return;
    };
    if (!amount || !isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0.');
      return;
    };
    if (!date) {
      toast.error('Date is required.');
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success('Income Added Successfully');
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error Adding Income:",
        error.response?.date?.message || error.message
      );
    }

  };

  // Delete Income
  const DeleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success('Income deleted successfully');
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error Deleting Income:",
        error.response?.data?.message || error.message
      );
    }

  };

  //handle download Income 
  const handledownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: 'blob',
        }
      );

      //Create a url for blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error Downloading income Details:", error);
      toast.error('Faild to download income details, please try again later.');

    }
  };

  useEffect(() => {
    fetchIncomeDetails();

    return () => { }

  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className='col-md-12'>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              DeleteIncome(id);
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownloadIncomeDetails={handledownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};


export default Income;