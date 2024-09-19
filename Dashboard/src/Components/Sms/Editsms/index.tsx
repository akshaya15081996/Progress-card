
import React, { FormEvent, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Input, Label } from 'reactstrap';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import { AddSmsTitle, SmsTitle, SecretkeyTitle, ApikeyTitle, SmsNameTitle, EditSmsTitle, Cancel, Submit } from '../../../Utils/Constants';
import axios from 'axios';
import { baseUrl, handleFileUpload } from '../../../Utils/FileUpload';
import { Btn } from '../../../AbstractElements';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import useCustomToasts from "../../../hooks/useCustomToast";



export default function Editsms() {
  const [name, setName] = useState('');
  const [secretkey, setSecretkey] = useState('');
  const [apikey, setApikey] = useState('');

  const [data, setData] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const [errors, setErrors] = useState<{ name?: string; secretkey?: string; apikey?: string; }>({});

  const validateForm = () => {
    const newErrors: { name?: string; secretkey?: string; apikey?: string; } = {};

    if (!name || !name.trim()) {
      newErrors.name = ' name is required.';
  }

  if (!secretkey || !secretkey.trim()) {
    newErrors.secretkey = 'secretkey is required.';
}

if (!apikey || !apikey.trim()) {
  newErrors.apikey = 'apikey is required.';
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseUrl}smssetting/findsmsbyid`, {
        id: location.state.id
      });
      setName(response.data.name);
      setSecretkey(response.data.secretkey);
      setApikey(response.data.apikey);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    let params = {
      name: name,
      secretkey: secretkey,
      apikey: apikey,
      id: location.state.id
    };
  
    try {
      let response = await axios.post(`${baseUrl}smssetting/updatesms`, params);
      console.log(response, 'rsp');
      if (response.status === 200) {
        toast.success("SMS edited successfully", {
          autoClose: 1000,
          onClose: () => navigate("/admiro/sms/viewsms"), // Navigate after toast closes
        });
      } else {
        toast.error("Failed to edit sms");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while editing the sms");
    }
  };
  




  return (
    <>
      <Breadcrumbs
        pageTitle={EditSmsTitle}
        parent={SmsTitle}
        title={EditSmsTitle}
      />

      <Col md={12}>
        <Card>
          <CardBody className="basic-form">

            <Form className="theme-form"
              onSubmit={handleEditForm}>
              <Row className='g-3'>
                <Col sm={3}>
                  <Label>{SmsNameTitle}</Label>
                </Col>
                <Col sm={9}>
                  <Input
                    type="text"
                    placeholder="Enter the name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                          validateForm(); 
                      }
                  }}
                  invalid={!!errors.name}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </Col>
                <Col sm={3}>
                  <Label>{SecretkeyTitle}</Label>
                </Col>
                <Col sm={9}>
                  <Input
                    type="textarea"
                    placeholder="Enter the key"
                    value={secretkey}
                    onChange={(e) =>{
                      setSecretkey(e.target.value)
                      if (errors.secretkey) {
                        validateForm();}
                      
                    }
                    } 
                    invalid={!!errors.secretkey}
                  />
                  {errors.secretkey && <div className="invalid-feedback">{errors.secretkey}</div>}
                </Col>

                <Col sm={3}>
                  <Label>{ApikeyTitle}</Label>
                </Col>
                <Col sm={9}>
                  <Input
                    type="textarea"
                    placeholder="Enter the key"
                    value={apikey}
                    invalid={!!errors.apikey}
                    onChange={(e) =>{
                      setApikey(e.target.value)
                      if (errors.apikey) {
                        validateForm();}
                    }
                    }
                  />
                  {errors.apikey && <div className="invalid-feedback">{errors.apikey}</div>}
                </Col>


                <Col>
                  <div className="text-end">
                    <Btn color='primary' className="me-2 btn-square">{Submit}</Btn>
                    {/* <Btn color='danger' className='btn-square'>{Cancel}</Btn> */}
                  </div>
                </Col>
              </Row>

            </Form>
          </CardBody>
        </Card>
      </Col>


    </>
  );
}




























