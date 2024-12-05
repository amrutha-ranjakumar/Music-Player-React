import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUser, FaUsers, FaMobileAlt, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePayment = (e, planAmount, planName) => {
    e.preventDefault();

    const options = {
      key: "rzp_test_coDPu7K5RpRMaA", // Only public key
      amount: planAmount * 100,
      currency: "INR",
      name: "Ever Rocking",
      description: `${planName} Plan Subscription`,
      handler: function (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${response.razorpay_payment_id}`,
          showConfirmButton: false,
          timer: 1500
        });

        navigate("/favourite", { state: { isPaid: true } });
      },
      theme: {
        color: "#c0392b",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const plans = [
    {
      name: "Individual",
      price: 59,
      description: "₹59 for 3 months. ₹119/month after. 1 account. Cancel anytime.",
      icon: <FaUser size={50} style={{ color: "#ff6f61" }} />,
    },
    {
      name: "Duo",
      price: 99,
      description: "₹99 for 3 months. ₹159/month after. 2 accounts. Cancel anytime.",
      icon: <FaUsers size={50} style={{ color: "#61b2ff" }} />,
    },
    {
      name: "Mini",
      price: 29,
      description: "₹29 for 1 month. ₹49/month after. 1 account with limited features.",
      icon: <FaMobileAlt size={50} style={{ color: "#4caf50" }} />,
    },
    {
      name: "Student",
      price: 49,
      description: "₹49 for 3 months. Special pricing for students. Requires verification.",
      icon: <FaGraduationCap size={50} style={{ color: "#ffc107" }} />,
    },
    {
      name: "Family",
      price: 199,
      description: "₹199 for 3 months. ₹299/month after. Up to 6 accounts.",
      icon: <FaUsers size={50} style={{ color: "#00bcd4" }} />,
    },
  ];

  return (
    <Container fluid style={{ backgroundColor: "#1a0006", padding: "50px 20px", minHeight: "100vh" }}>
      {/* Header Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "bold", color: "#f5f5f5" }}>
            Listen without limits.
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#d1d1d1", margin: "10px 0" }}>
            Try 3 months of Premium for <strong>₹59</strong>. Only ₹119/month after. Cancel anytime.
          </p>
          <div style={{ margin: "20px 0" }}>
            <Button
              variant="danger"
              style={{ marginRight: "10px", padding: "10px 25px", borderRadius: "30px", fontSize: "1rem", backgroundColor: "#c0392b", border: "none", }}>
              Get Premium Individual
            </Button>
            <Button variant="outline-light" style={{ padding: "10px 25px", borderRadius: "30px", fontSize: "1rem", color: "#fff", borderColor: "#fff", }}>
              View All Plans
            </Button>
          </div>
          <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
            Premium Individual only. ₹59 for 3 months, then ₹119/month. Offer valid until December 31, 2024.
          </p>
        </Col>
      </Row>

      {/* Plan Cards */}
      <Row className="gy-4 justify-content-center">
        {plans.map((plan, index) => (
          <Col key={index} md={4} sm={6}>
            <Card
              style={{ border: "none", borderRadius: "15px", background: "linear-gradient(145deg, #290006, #1a0006)", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)", color: "#f5f5f5", }}>
              <Card.Body className="text-center">
                {plan.icon}
                <h3 style={{ fontWeight: "bold", marginTop: "15px" }}>{plan.name}</h3>
                <p style={{ margin: "10px 0", color: "#d1d1d1" }}>{plan.description}</p>
                <Button
                  variant="outline-light"
                  style={{ borderRadius: "20px", fontWeight: "bold", padding: "8px 20px", color: "#660033", borderColor: "#990000", }} onClick={(e) => handlePayment(e, plan.price, plan.name)}>
                  Get {plan.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PaymentPage;
