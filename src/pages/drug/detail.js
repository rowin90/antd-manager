import React from 'react';
import Drug_API from '@/api/drug';
import Utils from '@/utils/utils';
import history from '@/utils/history';
import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
  Input,
  DatePicker,
  message
} from 'antd';

const { Option } = Select;

class DrugDetail extends React.Component {
  type = Utils.url_request('type') || '';
  drug_id = Utils.url_request('drug_id') || '';

  componentDidMount() {
    if (this.type === 'edit' || this.type === 'open') {
      // 编辑 \ 详情 页面
      this._renderDrugInfo(this.drug_id);
    }
  }
  handleSubmit = e => {
    e.preventDefault();

    if (this.type === 'open') {
      // 查看
      history.push('/drug/list');
      return;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 过滤数据
        let data = this._filterAjaxData(values);

        if (this.type === 'edit') {
          // 编辑
          Drug_API.edit({ data }).then(res => {
            message.success('编辑成功！');
            history.push('/drug/list');
          });
        } else if (this.type === 'add') {
          Drug_API.add({ data }).then(res => {
            message.success('添加成功！');
            history.push('/drug/list');
          });
        }
      }
    });
  };

  // 过滤提交数据
  _filterAjaxData(values) {
    values.approve_date = this._normTime(values.approve_date);
    values.time_to_market = this._normTime(values.time_to_market);
    values.expire = this._normTime(values.expire);
    values.status = values.status ? '1' : '0';

    values.drug_id = this.drug_id && Number(this.drug_id);

    return values;
  }

  // 渲染数据
  async _renderDrugInfo(drug_id) {
    let { data } = await Drug_API.detail({ drug_id });

    data.status = data.status === '0' ? false : true;
    data.time_to_market = data.time_to_market
      ? moment(data.time_to_market * 1000)
      : undefined;
    data.approve_date = data.approve_date
      ? moment(data.approve_date * 1000)
      : undefined;
    data.expire = data.expire ? moment(data.expire * 1000) : undefined;

    this.props.form.setFieldsValue(data);
  }

  // 转化成不带毫秒的时间戳
  _normTime = moment => {
    if (moment) {
      let m = moment.format('x');
      return m.slice(0, -3);
    }
    return undefined;
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const isDisabled = {
      disabled: this.type === 'open' ? true : false
    };
    return (
      <div className='content-wrap'>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Item label='药品名称'>
            {getFieldDecorator('drug_name', {
              rules: [{ required: true, message: '请输入药品名称!' }]
            })(<Input type='text' {...isDisabled} />)}
          </Form.Item>
          <Form.Item label='批准文号'>
            {getFieldDecorator('drug_license', {
              rules: [{ required: true, message: '请输入批准文号!' }]
            })(<Input type='text' {...isDisabled} />)}
          </Form.Item>
          <Form.Item label='商品名称'>
            {getFieldDecorator('drug_shop_name', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>

          <Form.Item label='药品类型'>
            {getFieldDecorator('drug_type')(
              <Radio.Group {...isDisabled}>
                <Radio value='1'>西药</Radio>
                <Radio value='2'>中成药</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='是否医保'>
            {getFieldDecorator('is_insurance')(
              <Radio.Group {...isDisabled}>
                <Radio value='0'>否</Radio>
                <Radio value='1'>是</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='OTC类型'>
            {getFieldDecorator('is_otc')(
              <Radio.Group {...isDisabled}>
                <Radio value='0'>非OTC</Radio>
                <Radio value='1'>甲类</Radio>
                <Radio value='2'>乙类</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='药品拼音简写'>
            {getFieldDecorator('drug_name_cn_idx', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='药品汉语拼音'>
            {getFieldDecorator('drug_name_cn', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='药品英文名称'>
            {getFieldDecorator('drug_name_eng', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='药品图片'>
            {getFieldDecorator('drug_img', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='功能主治'>
            {getFieldDecorator('drug_action', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='用法与用量'>
            {getFieldDecorator('dosage_use', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='成份'>
            {getFieldDecorator('ingredients', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='生产厂家'>
            {getFieldDecorator('manufacturer_name', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='包装规格'>
            {getFieldDecorator('package', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='药物相互作用'>
            {getFieldDecorator('pharmacological', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='注意事项'>
            {getFieldDecorator('precaution', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='执行标准'>
            {getFieldDecorator('standard', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='性份'>
            {getFieldDecorator('description', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='禁忌'>
            {getFieldDecorator('contraindication', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='条形码'>
            {getFieldDecorator('bar_code', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='不良反应'>
            {getFieldDecorator('adverse_reaction', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='贮藏'>
            {getFieldDecorator('storage', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='上架状态'>
            {getFieldDecorator('status', { valuePropName: 'checked' })(
              <Switch {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='批准日期'>
            {getFieldDecorator('approve_date', {})(
              <DatePicker {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='上市时间'>
            {getFieldDecorator('time_to_market', {})(
              <DatePicker {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='有效期'>
            {getFieldDecorator('expire', {})(<DatePicker {...isDisabled} />)}
          </Form.Item>
          <Form.Item label='制剂类型'>
            {getFieldDecorator('dosage_form', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='编辑规格'>
            <div>
              {getFieldDecorator('dosage', {})(
                <InputNumber
                  min={1}
                  style={{ width: '80px' }}
                  placeholder='剂 量'
                  {...isDisabled}
                />
              )}
              {getFieldDecorator('dosage_unit', {})(
                <Select
                  placeholder='剂量单位'
                  style={{ width: '100px' }}
                  {...isDisabled}
                >
                  <Option value='mg'>mg</Option>
                  <Option value='g'>g</Option>
                  <Option value='ml'>ml</Option>
                  <Option value='支'>支</Option>
                  <Option value='片'>片</Option>
                </Select>
              )}
              <span>&nbsp;&nbsp;*&nbsp;&nbsp;</span>
              {getFieldDecorator('form', {})(
                <InputNumber
                  min={1}
                  style={{ width: '80px' }}
                  placeholder='制剂数量'
                  {...isDisabled}
                />
              )}
              {getFieldDecorator('form_unit', {})(
                <Select
                  placeholder='制剂单位'
                  style={{ width: '100px' }}
                  {...isDisabled}
                >
                  <Option value='支'>支</Option>
                  <Option value='片'>片</Option>
                  <Option value='粒'>粒</Option>
                  <Option value='丸'>丸</Option>
                  <Option value='贴'>贴</Option>
                  <Option value='袋'>袋</Option>
                  <Option value='瓶'>瓶</Option>
                  <Option value='枚'>枚</Option>
                  <Option value='吸'>吸</Option>
                  <Option value='揿'>揿</Option>
                  <Option value='滴'>滴</Option>
                  <Option value='包'>包</Option>
                  <Option value='盒'>盒</Option>
                  <Option value='板'>板</Option>
                  <Option value='只'>只</Option>
                  <Option value='个'>个</Option>
                  <Option value='次'>次</Option>
                  <Option value='cm'>cm</Option>
                  <Option value='ml'>ml</Option>
                  <Option value='g'>g</Option>
                </Select>
              )}
              <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
              {getFieldDecorator('store_unit', {})(
                <Select
                  placeholder='库存单位'
                  style={{ width: '100px' }}
                  {...isDisabled}
                >
                  <Option value='盒'>盒</Option>
                  <Option value='袋'>袋</Option>
                  <Option value='瓶'>瓶</Option>
                  <Option value='支'>支</Option>
                  <Option value='kg'>kg</Option>
                  <Option value='g'>g</Option>
                  <Option value='包'>包</Option>
                  <Option value='片'>片</Option>
                  <Option value='粒'>粒</Option>
                  <Option value='dag'>dag</Option>
                  <Option value='只'>只</Option>
                  <Option value='罐'>罐</Option>
                  <Option value='板'>板</Option>
                  <Option value='个'>个</Option>
                  <Option value='大盒'>大盒</Option>
                  <Option value='贴'>贴</Option>
                </Select>
              )}
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type='primary' htmlType='submit'>
              确定
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              onClick={() => history.push('/drug/list')}
            >
              返回
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'validate_other' })(DrugDetail);
