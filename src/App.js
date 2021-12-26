import { useState } from "react";
import { Badge, Card, Container, FormCheck, Row, Col } from "react-bootstrap";
import { RangeSlider } from "./components/RangeSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const rates = {
  month: {
    "10K": 8,
    "50K": 12,
    "100K": 16,
    "500K": 24,
    "1M": 36,
  },
  year: {
    "10K": 8 * 12 * 0.75,
    "50K": 12 * 12 * 0.75,
    "100K": 16 * 12 * 0.75,
    "500K": 24 * 12 * 0.75,
    "1M": 36 * 12 * 0.75,
  },
};

function App() {
  const [pageViews, setPageViews] = useState("100K");
  const [period, setPeriod] = useState("month");

  const rate = rates[period][pageViews];
  const savings = "year" === period ? (rate / 0.75) * 0.25 : null;
  return (
    <div className="app">
      <section className="pricing">
        <Container>
          <div className="section-introduction">
            <h1 className="pricing__heading">Simple, traffic-based pricing</h1>
            <p>Sign-up for our 30-day trial. No credit card required.</p>
          </div>
          <Card>
            <Card.Body className="card__upper-body">
              <Container className="card-body__content">
                <Row className="d-flex flex-wrap align-items-center">
                  <Col xs={12} lg={6}>
                    <p className="pricing__pageviews text-lg-start">
                      {pageViews} Pageviews
                    </p>
                  </Col>
                  <Col xs={12} lg={{ order: "last" }}>
                    <RangeSlider
                      min="1"
                      max="5"
                      onInput={handlePageViews}
                    ></RangeSlider>
                  </Col>
                  <Col xs={12} lg={6}>
                    <div className="flex-row-middle position-relative text-lg-end justify-content-lg-end">
                      <span className="pricing__rate display-6">
                        ${rate.toFixed(2)}
                      </span>
                      /{period}
                      {"year" === period ? (
                        <Badge className="yearly-savings" bg="custom">
                          you save ${savings.toFixed(2)}
                        </Badge>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <div className="flex-row-middle pricing__billing-options">
                  <p className="monthly-billing billing">Monthly Billing</p>
                  <FormCheck type="switch" onInput={handleBillingPeriod} />
                  <p className="yearly-billing billing">
                    Yearly Billing{" "}
                    <Badge className="yearly-badge" bg="custom">
                      -25% <span className="d-none d-lg-inline">discount</span>
                    </Badge>
                  </p>
                </div>
              </Container>
            </Card.Body>
            <hr className="card__hr" />
            <Card.Body>
              <Container className="h-100">
                <Row className="h-100 d-flex flex-wrap flex-column justify-content-between align-items-center flex-lg-row">
                  <Col xs={12} lg={6}>
                    <ul className="perks">
                      <li className="perks__entry">Unlimited websites</li>
                      <li className="perks__entry">100% data ownership</li>
                      <li className="perks__entry">Email reports</li>
                    </ul>
                  </Col>
                  <Col xs={12} lg={6}>
                    <button className="btn card__cta">Start my trial</button>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );

  function handlePageViews(e) {
    const views = ["10K", "50K", "100K", "500K", "1M"];
    setPageViews(views[e.target.value - 1]);
  }

  function handleBillingPeriod(e) {
    if (e.target.checked) {
      setPeriod("year");
    } else {
      setPeriod("month");
    }
  }
}

export default App;
