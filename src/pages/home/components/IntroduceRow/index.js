import React from 'react';
import { Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;
const IntroduceRow = props => {
  let { total_money, deal_count, total_visit, user_total } = props.data;
  return (
    <div>
      <Row gutter={24}>
        <Col span={6}>
          <Card title='总销售额' hoverable loading={!total_money}>
            <Title level={3}>&yen;{total_money}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='总支付笔数' hoverable loading={!deal_count}>
            <Title level={3}>{deal_count}笔</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='总访问量' hoverable loading={!total_visit}>
            <Title level={3}>{total_visit}次</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='总用户数' hoverable loading={!user_total}>
            <Title level={3}>{user_total}个</Title>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default IntroduceRow;
