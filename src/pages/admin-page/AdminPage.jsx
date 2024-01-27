import React, { useState, useEffect }  from 'react';
import { Row, Col, Card, Form, Input, Button, Select, List, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined ,FolderViewOutlined } from '@ant-design/icons';
import dealImage from '../../assets/img/superdeal_Toast Banner.png';
import './AdminPage.css'
import { useApi } from '../../context/ApiContext';


const AdminPage = () => {
  const { postAsync , getAsync } = useApi(); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const gridStyle = {
    width: '100%',
    textAlign: 'center',
  };


  //Product
  const viewCategoryWithProduct = async (categoryId) => {
      const response = await getAsync(`/Category/getCategoryWithProducts/${categoryId}`);
      console.log(response.data);
      const categoryWithProducts = response.data;

      if(categoryWithProducts ){
        Modal.info({
          title: `Category Information # ${categoryWithProducts[0].categoryName}`, 
          width: '1000px',
          content: (
            <List
            grid={{
              gutter: 16,
              column: 2 ,
            }}
            dataSource={categoryWithProducts}
            renderItem={(product) => (
                <List.Item key={product.productId}>
                  <Card className="mt-4" title={<span>Product Name: {product.productName}</span>}>
                      <div className='mt-3 ms-4'>
                        <p>Product Price: {product.productPrice}</p>
                        <p>Product Description: {product.productDescription}</p>
                      </div>
                  </Card>
                  
                  
                  <hr />
                </List.Item>
              )}
            />
          ),
          onOk() { },
        });
      }
      else{
        message.error('Failed to fetch category with products. Please try again.'); 
      }
  };
  

  const fetchProducts = async () => {
    try {
      const response = await getAsync('/Category/getProduct');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const onFinishProduct = async (values) => {
    const { categoryId, productName, productPrice, productDescription } = values;
    const newProduct = {
      productName,
      productPrice,
      productDescription,
      categoryId,
    };
    const response = await postAsync('/Category/addProduct', newProduct);
    fetchProducts();
    console.log(response , "response");
  };



  //Category
  const fetchCategories = async () => {
    try {
      const response = await getAsync('/Category/getCategory');
        setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const handleViewCategory = async (index) => {
    try {
      const categoryId = categories[index].categoryId;
      await viewCategoryWithProduct(categoryId);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Error viewing category:', error);
    }
  };


  // const handleViewCategory = (index) => {
  //   Modal.confirm({
  //     title: 'View Category',
  //     content: (
  //       <Input
  //         defaultValue={categories[index]}
  //         onChange={(e) => {
  //           const updatedCategories = [...categories];
  //           updatedCategories[index] = e.target.value;
  //           setCategories(updatedCategories);
  //         }}
  //       />
  //     ),
  //     onOk: () => {
  //     },
  //   });
  // };

  const handleDeleteCategory = (index) => {
    Modal.confirm({
      title: 'Delete Category',
      content: 'Are you sure you want to delete this category?',
      onOk: () => {
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);
        setCategories(updatedCategories);
      },
    });
  };

  const showAddCategoryModal = () => {
    Modal.confirm({
      title: 'Add Category',
      okButtonProps: {
        disabled: true,
      },
      cancelButtonProps: {
        disabled: true,
      },
      content: (
        <Form onFinish={onAddCategoryFinish}>
          <Form.Item
            name="newCategory"
            rules={[{ required: true, message: 'Please enter the new category!' }]}
          >
            <Input placeholder="New Category" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
      ),
      footer: null, 
    });
  };
  
  const onAddCategoryFinish = async (values) => {
    try {
      await addCategoryToDB(values.newCategory);
      Modal.destroyAll();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };


  const addCategoryToDB = async (newCategory) => {
    try {
      const response = await postAsync('/Category/addCategory', { categoryName: newCategory }); 
      console.log('Response:', response.data);
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); 
 


  return (
    <div>
      <div className="content-bg p-5 h-100">
        <Card title="Admin">
          <div className='p-4'>
          <Card.Grid style={gridStyle} hoverable={false}>
      
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h6 className='d-flex mt-2 mb-2'>
                  Categories Management
                </h6>
              </Col>
              {categories.map((category, index) => (
                <Col key={index} span={8}>
                  <Card.Grid style={gridStyle}>
                    <span>{category.categoryName}</span>
                    <div>
                      <Button
                        icon={<FolderViewOutlined />}
                        type="link"
                        onClick={() => handleViewCategory(index)}
                      >
                        View category
                      </Button>
                      <Button
                        icon={<DeleteOutlined />}
                        type="link"
                        onClick={() => handleDeleteCategory(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Grid>
                </Col>
              ))}
              <Col span={8}>
                <Card.Grid style={gridStyle} className="h-100 d-flex align-items-center justify-content-center">
                  <Button type="dashed" icon={<PlusOutlined />} onClick={showAddCategoryModal}>
                    Add Category
                  </Button>
                </Card.Grid>
              </Col>
            </Row>

          </Card.Grid>

          


          {/* Form Product */}
          <Form onFinish={onFinishProduct} className='mt-5'>
            <Card.Grid style={gridStyle}>
              <Row gutter={16} className='p-1'>
                <Col span={24}>
                  <h6 className='d-flex mt-2 mb-5'>
                    Product Mananagement
                  </h6>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                  >
                    <Select placeholder="Select a category">
                      {categories.map((category) => (
                        <Select.Option key={category.categoryId} value={category.categoryId}>
                          {category.categoryName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                      name="productName"
                      rules={[{ required: true, message: 'Please enter product name!' }]}
                    >
                      <Input placeholder="Product Name" />
                    </Form.Item>
                </Col>
                <Col span={12}/>
                <Col span={12}>
                  <Form.Item
                      name="productPrice"
                      rules={[{ required: true, message: 'Please enter product price!' }]}
                    >
                      <Input placeholder="Product Price" />
                  </Form.Item>
                </Col>
                <Col span={12}/>
                <Col span={12}>
                  <Form.Item
                      name="productDescription"
                      rules={[{ required: true, message: 'Please enter product description!' }]}
                    >
                      <Input.TextArea placeholder="Product Description" />
                    </Form.Item>
                
                </Col>
                <Col span={12}/>
                <Col span={12}>
                  <Button type="primary" htmlType="submit">
                    Add Product
                  </Button>
                </Col>
              </Row>
              
          
            </Card.Grid>
          </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
