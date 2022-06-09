import { Form, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import FeatureForImportanceForm from '../../components/pdesk/featureForInstrumentsForm/FeatureForImportanceForm';
import FeatureInstrumentsForm from '../../components/pdesk/featureForInstrumentsForm/FeatureInstrumentsForm';
import withAuthAndPermission from '../../HOC/withAuthAndPermission/withAuthAndPermission';
import { Modules } from '../../type/module';
import { Permissions } from '../../type/permission';
import { FEATURE_INSTRUMENTS_ACTIVEMONTH, FEATURE_IMPORTANCE_TABLE, FEATURE_INSTRUMENTS_TABLE, FEATURE_INSTRUMENTS_LOOKAHEAD, FEATURE_INSTRUMENTS_Y_VARIABLE } from '../../url/pdesk';
import { get } from '../../util/servercall';

const FeatureForInstruments = () => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [feature, setFeature] = useState<any[]>([]);
  const [activeMonth, setActiveMonth] = useState([]);
  const [lookahead, setLookahead] = useState([]);
  const [instruments, setInstruments] = useState<any[]>([]);
  const [importance, setImportance] = useState<any[]>([]);
  const [isLoading , setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responsefeature = await get(FEATURE_INSTRUMENTS_Y_VARIABLE);
      setFeature(responsefeature.data.feature_list);
      const responseactiveMonth = await get(FEATURE_INSTRUMENTS_ACTIVEMONTH);
      setActiveMonth(responseactiveMonth.data);
      const responLookahead = await get(FEATURE_INSTRUMENTS_LOOKAHEAD);
      setLookahead(responLookahead.data);
      form.setFieldsValue({
        featureField: responsefeature.data.feature_list[0].value,
        lookahead2: responLookahead.data[0].value,
        featureField2: responsefeature.data.feature_list[0].value,
        activeMonth: responseactiveMonth.data[0].value,
      });
    };
    fetchData();
  }, []);

  const fetchTableData = async () => {
    setLoading(true)
    const featureData = form.getFieldValue('featureField');
    const activeMonthData = form.getFieldValue('activeMonth');

    if (featureData == undefined || activeMonthData == undefined) {
      return;
    }

    const feature_table = await get(
      FEATURE_INSTRUMENTS_TABLE + `?label=${featureData}&active_month=${activeMonthData}`
    );
    setInstruments(feature_table.data.data);
    setLoading(false)

    setLoading(true)
    const featureData2 = form.getFieldValue('featureField2');
    const lookAheadData = form.getFieldValue('lookahead2');

    if (featureData2 == undefined || lookAheadData == undefined) {
      return;
    }

    const feature_importance_table = await get(
      FEATURE_IMPORTANCE_TABLE +`?label=${featureData2}&lookahead=${lookAheadData}`
    );
    setImportance(feature_importance_table.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchTableData();
  }, [activeMonth, feature, lookahead]);

  const handleChange = () => {
    fetchTableData();
  };

  const columns = [
    {
      title: 'Feature names',
      dataIndex: 'feature_name',
      key: 'feature_names',
    },
  ];

  const columns2 = [
    {
      title: 'Feature name',
      dataIndex: 'feature_name',
      key: 'feature_name',
    },
    {
      title: 'Feature importance',
      dataIndex: 'feature_importance',
      key: 'feature_names',
    },
  ];

  const feature_instruments = instruments.map((data)=>{
  return (
      data.feature_instruments
    )
  })
  const feature_importance = importance.map((data)=>{
    return (
        data.feature_importance
      )
  })

  return (
    <Layout>
      <FeatureInstrumentsForm handleChange={handleChange} feature={feature} activeMonth={activeMonth} form={form}/>
      <Table loading={isLoading} columns={columns} dataSource={feature_instruments[0]} rowKey="feature_name" size="middle" className="mt-6"/>        
 
      <FeatureForImportanceForm handleChange={handleChange} feature={feature} lookahead={lookahead} form={form}/>
      <Table loading={isLoading} columns={columns2} dataSource={feature_importance[0]} rowKey="feature_name" size="middle" className="mt-6"/>

    </Layout>
  );
};

export default withAuthAndPermission(FeatureForInstruments,Modules.FEATURE_FOR_INSTRUMENTS , Permissions.VIEW);
