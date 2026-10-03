import React, { useEffect, useState } from "react";
import "./App.css";

const API = "/api";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [showAppointment, setShowAppointment] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [doctorRes, patientRes, appointmentRes] = await Promise.all([
        fetch(`${API}/doctors`),
        fetch(`${API}/patients`),
        fetch(`${API}/appointments`),
      ]);

      const doctorData = await doctorRes.json();
      const patientData = await patientRes.json();
      const appointmentData = await appointmentRes.json();

      setDoctors(Array.isArray(doctorData) ? doctorData : []);
      setPatients(Array.isArray(patientData) ? patientData : []);
      setAppointments(
        Array.isArray(appointmentData) ? appointmentData : []
      );
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleAppointmentChange = (e) => {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value,
    });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();

    if (
      !appointmentForm.patient ||
      !appointmentForm.doctor ||
      !appointmentForm.date ||
      !appointmentForm.time ||
      !appointmentForm.reason
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(`${API}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...appointmentForm,
          status: "Pending",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to book appointment");
        return;
      }

      alert("Appointment booked successfully!");

      setShowAppointment(false);

      setAppointmentForm({
        patient: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
        notes: "",
      });

      loadData();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="nav-container">

          <div
            className="brand"
            onClick={() => scrollToSection("home")}
          >
            <div className="brand-icon">✚</div>

            <div>
              <h2>MediNova</h2>
              <span>Healthcare</span>
            </div>
          </div>

          <nav className={menuOpen ? "nav-links active" : "nav-links"}>
            <button onClick={() => scrollToSection("home")}>
              Home
            </button>

            <button onClick={() => scrollToSection("services")}>
              Services
            </button>

            <button onClick={() => scrollToSection("doctors")}>
              Doctors
            </button>

            <button onClick={() => scrollToSection("about")}>
              About
            </button>

            <button onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </nav>

          <button
            className="nav-appointment"
            onClick={() => setShowAppointment(true)}
          >
            Book Appointment
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>


      {/* ================= HERO ================= */}
      <section className="hero" id="home">

        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="pulse"></span>
              Trusted Healthcare • Available 24/7
            </div>

            <h1>
              Healthcare that
              <span> feels personal.</span>
            </h1>

            <p>
              Expert doctors, smarter care and a better way
              to manage your health. Your wellbeing is at the
              heart of everything we do.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => setShowAppointment(true)}
              >
                Book Appointment
                <span>→</span>
              </button>

              <button
                className="secondary-btn"
                onClick={() => scrollToSection("doctors")}
              >
                Find a Doctor
              </button>

            </div>

            <div className="hero-trust">

              <div className="avatar-group">
                <span>👩🏻‍⚕️</span>
                <span>👨🏻‍⚕️</span>
                <span>👩🏽‍⚕️</span>
                <span>+</span>
              </div>

              <div>
                <strong>10,000+</strong>
                <small>patients trust us</small>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="hero-circle"></div>

            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=90"
              alt="Doctor"
              className="doctor-image"
            />

            <div className="floating-card availability-card">

              <div className="status-dot"></div>

              <div>
                <strong>Live Hospital Status</strong>
                <span>Everything is running smoothly</span>
              </div>

            </div>


            <div className="floating-card doctor-card">

              <div className="mini-icon">✓</div>

              <div>
                <strong>12 Doctors</strong>
                <span>Available today</span>
              </div>

            </div>


            <div className="floating-card rating-card">

              <div className="rating-star">★</div>

              <div>
                <strong>4.9 / 5</strong>
                <span>Patient rating</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-section">

        <div className="stats-container">

          <div className="stat">
            <strong>{doctors.length || 12}+</strong>
            <span>Specialist Doctors</span>
          </div>

          <div className="stat">
            <strong>{patients.length || 5000}+</strong>
            <span>Patients Served</span>
          </div>

          <div className="stat">
            <strong>24/7</strong>
            <span>Emergency Care</span>
          </div>

          <div className="stat">
            <strong>98%</strong>
            <span>Patient Satisfaction</span>
          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section className="section services-section" id="services">

        <div className="section-heading">

          <div>
            <span className="section-label">OUR SERVICES</span>

            <h2>
              Everything you need
              <br />
              for better health.
            </h2>
          </div>

          <p>
            From regular checkups to specialized treatment,
            our healthcare services are designed around you.
          </p>

        </div>


        <div className="service-grid">

          <ServiceCard
            icon="♡"
            title="Cardiology"
            text="Complete heart care from experienced specialists."
          />

          <ServiceCard
            icon="✦"
            title="Neurology"
            text="Advanced diagnosis and treatment for neurological conditions."
          />

          <ServiceCard
            icon="♧"
            title="Orthopedics"
            text="Personalized care for bones, joints and movement."
          />

          <ServiceCard
            icon="⌁"
            title="Pediatrics"
            text="Gentle and comprehensive healthcare for children."
          />

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section className="about-section" id="about">

        <div className="about-image-wrapper">

          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=90"
            alt="Healthcare"
          />

          <div className="experience-card">
            <strong>15+</strong>
            <span>Years of<br />Healthcare Excellence</span>
          </div>

        </div>


        <div className="about-content">

          <span className="section-label">WHY MEDINOVA?</span>

          <h2>
            Modern medicine.
            <br />
            Human connection.
          </h2>

          <p>
            We believe healthcare should be more than just
            appointments and prescriptions. It should be
            comfortable, accessible and built around every
            individual patient.
          </p>

          <div className="check-list">

            <div>
              <span>✓</span>
              <p>Experienced medical professionals</p>
            </div>

            <div>
              <span>✓</span>
              <p>Modern diagnostic facilities</p>
            </div>

            <div>
              <span>✓</span>
              <p>Patient-first approach</p>
            </div>

            <div>
              <span>✓</span>
              <p>24/7 emergency support</p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= DOCTORS ================= */}

      <section className="section doctors-section" id="doctors">

        <div className="section-heading">

          <div>
            <span className="section-label">
              OUR SPECIALISTS
            </span>

            <h2>
              Meet our
              <br />
              healthcare experts.
            </h2>
          </div>

          <p>
            Our experienced specialists are here to provide
            personalized care at every stage of your journey.
          </p>

        </div>


        <div className="doctor-grid">

          {doctors.length > 0 ? (
            doctors.slice(0, 4).map((doctor, index) => (
              <DoctorCard
                key={doctor._id || index}
                doctor={doctor}
              />
            ))
          ) : (
            <>
              <DoctorCard
                doctor={{
                  name: "Dr. Ravi Kumar",
                  specialization: "Cardiology",
                  experience: 10,
                }}
              />

              <DoctorCard
                doctor={{
                  name: "Dr. Ananya Sharma",
                  specialization: "Neurology",
                  experience: 8,
                }}
              />

              <DoctorCard
                doctor={{
                  name: "Dr. Rahul Reddy",
                  specialization: "Orthopedics",
                  experience: 12,
                }}
              />
            </>
          )}

        </div>

      </section>


      {/* ================= APPOINTMENT CTA ================= */}

      <section className="appointment-banner">

        <div>

          <span>READY TO TAKE CARE OF YOUR HEALTH?</span>

          <h2>
            Your healthier tomorrow
            <br />
            starts today.
          </h2>

        </div>

        <button
          className="white-btn"
          onClick={() => setShowAppointment(true)}
        >
          Book an Appointment →
        </button>

      </section>


      {/* ================= CONTACT ================= */}

      <section className="contact-section" id="contact">

        <div>
          <span className="section-label">CONTACT US</span>

          <h2>
            We're here when
            <br />
            you need us.
          </h2>
        </div>

        <div className="contact-info">

          <div>
            <span>📍</span>
            <div>
              <strong>Our Location</strong>
              <p>Guntur, Andhra Pradesh, India</p>
            </div>
          </div>

          <div>
            <span>☎</span>
            <div>
              <strong>Call Us</strong>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div>
            <span>✉</span>
            <div>
              <strong>Email</strong>
              <p>care@medinova.com</p>
            </div>
          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-brand">

          <div className="brand">
            <div className="brand-icon">✚</div>

            <div>
              <h2>MediNova</h2>
              <span>Healthcare</span>
            </div>
          </div>

          <p>
            Better care. Better technology.
            Better health.
          </p>

        </div>

        <div className="footer-copy">
          © 2026 MediNova Healthcare. All rights reserved.
        </div>

      </footer>


      {/* ================= APPOINTMENT MODAL ================= */}

      {showAppointment && (

        <div
          className="modal-overlay"
          onClick={() => setShowAppointment(false)}
        >

          <div
            className="appointment-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowAppointment(false)}
            >
              ×
            </button>

            <div className="modal-title">

              <span className="section-label">
                APPOINTMENT
              </span>

              <h2>Book your visit</h2>

              <p>
                Choose your doctor and preferred appointment time.
              </p>

            </div>


            <form onSubmit={bookAppointment}>

              <div className="form-row">

                <div className="form-field">

                  <label>Patient *</label>

                  <select
                    name="patient"
                    value={appointmentForm.patient}
                    onChange={handleAppointmentChange}
                  >
                    <option value="">Select patient</option>

                    {patients.map((patient) => (
                      <option
                        key={patient._id}
                        value={patient._id}
                      >
                        {patient.name}
                      </option>
                    ))}

                  </select>

                </div>


                <div className="form-field">

                  <label>Doctor *</label>

                  <select
                    name="doctor"
                    value={appointmentForm.doctor}
                    onChange={handleAppointmentChange}
                  >
                    <option value="">Select doctor</option>

                    {doctors.map((doctor) => (
                      <option
                        key={doctor._id}
                        value={doctor._id}
                      >
                        {doctor.name}
                      </option>
                    ))}

                  </select>

                </div>

              </div>


              <div className="form-row">

                <div className="form-field">

                  <label>Date *</label>

                  <input
                    type="date"
                    name="date"
                    value={appointmentForm.date}
                    onChange={handleAppointmentChange}
                  />

                </div>


                <div className="form-field">

                  <label>Time *</label>

                  <input
                    type="time"
                    name="time"
                    value={appointmentForm.time}
                    onChange={handleAppointmentChange}
                  />

                </div>

              </div>


              <div className="form-field">

                <label>Reason *</label>

                <input
                  type="text"
                  name="reason"
                  placeholder="Example: Regular checkup"
                  value={appointmentForm.reason}
                  onChange={handleAppointmentChange}
                />

              </div>


              <div className="form-field">

                <label>Additional Notes</label>

                <textarea
                  name="notes"
                  placeholder="Anything the doctor should know..."
                  value={appointmentForm.notes}
                  onChange={handleAppointmentChange}
                />

              </div>


              <button
                type="submit"
                className="submit-appointment"
              >
                Confirm Appointment →
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


/* ================= SERVICE CARD ================= */

function ServiceCard({ icon, title, text }) {

  return (
    <div className="service-card">

      <div className="service-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <span className="card-arrow">↗</span>

    </div>
  );
}


/* ================= DOCTOR CARD ================= */

function DoctorCard({ doctor }) {

  const doctorImages = [
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=85",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=85",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=85",
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=85",
  ];

  const randomIndex =
    Math.abs((doctor.name || "").length) % doctorImages.length;

  return (
    <div className="doctor-card">

      <div className="doctor-photo">

        <img
          src={doctorImages[randomIndex]}
          alt={doctor.name}
        />

        <div className="online-dot"></div>

      </div>

      <div className="doctor-details">

        <h3>{doctor.name}</h3>

        <span>
          {doctor.specialization || "Medical Specialist"}
        </span>

        <div className="doctor-meta">
          <span>Experience</span>
          <strong>
            {doctor.experience || 5} Years
          </strong>
        </div>

      </div>

    </div>
  );
}


export default App;