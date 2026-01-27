import { motion } from "motion/react";
import { AnimatedSection } from "@/app/components/animated-section";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { email, locations, telephone } from "../fixtures";
import LocationsMap from "../components/ui/locationsMap";
import AnimatedDots from "../components/ui/animated-dots";

const actualLocations = locations.map((loc) => loc.actualAddress);
const displayLocations = locations.map((loc) => loc.displayAddress);

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: displayLocations,
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [telephone],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [email],
  },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(false);
    try {
      const res = await fetch("https://pk5-api.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="text-[#c89b3c]">Touch</span>
            </h1>
            <p className="text-xl text-gray-400">
              We're here to answer your questions and discuss partnership
              opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <AnimatedSection key={info.title} delay={index * 0.1}>
                <motion.div
                  className="p-8 bg-[#0f0f0f] rounded-lg border border-gray-800 text-center"
                  whileHover={{ y: -10, borderColor: "#c89b3c", scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-[#c89b3c]/10 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <info.icon className="w-8 h-8 text-[#c89b3c]" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4">{info.title}</h3>
                  <div className="space-y-2">
                    {info.title === "Visit Us"
                      ? locations.map((loc) => (
                          <a
                            key={loc.displayAddress}
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.actualAddress)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#c89b3c] transition-colors block"
                          >
                            {loc.type ? `${loc.type}: ` : ""}
                            {loc.displayAddress}
                          </a>
                        ))
                      : info.title === "Call Us"
                        ? info.details.map((detail) => (
                            <a
                              key={detail}
                              href={`tel:${detail}`}
                              className="text-gray-400 hover:text-[#c89b3c] transition-colors block"
                            >
                              {detail}
                            </a>
                          ))
                        : info.title === "Email Us"
                          ? info.details.map((detail) => (
                              <a
                                key={detail}
                                href={`mailto:${detail}`}
                                className="text-gray-400 hover:text-[#c89b3c] transition-colors block"
                              >
                                {detail}
                              </a>
                            ))
                          : info.details.map((detail) => (
                              <p key={detail} className="text-gray-400">
                                {detail}
                              </p>
                            ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <h2 className="text-4xl font-bold mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-[#1a1a1a] border-2 border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                    animate={{
                      borderColor: focusedField === "name" ? "#c89b3c" : "#333",
                    }}
                  />
                </div>

                <div>
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-[#1a1a1a] border-2 border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                    animate={{
                      borderColor:
                        focusedField === "email" ? "#c89b3c" : "#333",
                    }}
                  />
                </div>

                <div>
                  <motion.input
                    type="text"
                    name="company"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-[#1a1a1a] border-2 border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                    animate={{
                      borderColor:
                        focusedField === "company" ? "#c89b3c" : "#333",
                    }}
                  />
                </div>

                <div>
                  <motion.select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-[#1a1a1a] border-2 border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors"
                    animate={{
                      borderColor:
                        focusedField === "subject" ? "#c89b3c" : "#333",
                    }}
                  >
                    <option value="">Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="investor">Investor Relations</option>
                    <option value="career">Career Opportunities</option>
                    <option value="media">Media Inquiry</option>
                  </motion.select>
                </div>

                <div>
                  <motion.textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-[#1a1a1a] border-2 border-gray-800 rounded-lg focus:border-[#c89b3c] focus:outline-none transition-colors resize-none"
                    animate={{
                      borderColor:
                        focusedField === "message" ? "#c89b3c" : "#333",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={!loading ? { scale: 1.02 } : undefined}
                  whileTap={!loading ? { scale: 0.98 } : undefined}
                  animate={loading ? { scale: [1, 1.01, 1] } : { scale: 1 }}
                  transition={
                    loading
                      ? { repeat: Infinity, duration: 1.2 }
                      : { duration: 0.2 }
                  }
                  className="w-full px-8 py-4 bg-[#c89b3c] text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#d4a84a] transition-colors disabled:opacity-70"
                  disabled={loading || submitted}
                >
                  {submitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : loading ? (
                    <>
                      Sending
                      <AnimatedDots />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </motion.button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-center"
                  >
                    Thank you! We'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.2}>
              <h2 className="text-4xl font-bold mb-8">Our Locations</h2>

              <motion.div
                className="bg-[#1a1a1a] rounded-lg p-8 h-[600px] border border-gray-800 flex flex-col"
                whileHover={{ borderColor: "#c89b3c" }}
                transition={{ duration: 0.3 }}
              >
                {/* Centered text */}
                <div className="text-center flex-1 flex flex-col items-center justify-center">
                  <MapPin className="w-24 h-24 text-[#c89b3c] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Interactive Map</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Our mining operations span across multiple strategic
                    locations worldwide. Visit us at our head office or any of
                    our operational sites.
                  </p>
                </div>

                {/* Full-width map (outside the centered text block) */}
                <div className="w-full h-[300px] rounded-lg overflow-hidden mt-6">
                  <LocationsMap locations={actualLocations} />
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl font-bold mb-8">Office Hours</h2>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="text-right text-gray-400">Monday - Friday:</div>
                <div className="text-left font-bold">8:00 AM - 6:00 PM</div>
                <div className="text-right text-gray-400">Saturday:</div>
                <div className="text-left font-bold">9:00 AM - 2:00 PM</div>
                <div className="text-right text-gray-400">Sunday:</div>
                <div className="text-left font-bold">Closed</div>
              </div>
              <p className="mt-8 text-gray-400">
                For urgent matters outside business hours, please contact our
                24/7 emergency line:{" "}
                <a
                  href={`tel:${telephone}`}
                  className="text-[#c89b3c] font-bold hover:underline transition-colors"
                >
                  {telephone}
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
