// pages/Contact.jsx
import { Mail, Globe, Linkedin, Github } from "lucide-react";

const team = [
  {
    name: "Tasneem Al Sahat",
    role: "Full Stack Developer",
    email: "tasneem@example.com",
    facebook: "https://facebook.com/your-profile",
    linkedin: "https://linkedin.com/in/your-profile",
    github: "https://github.com/your-profile",
    image: "https://via.placeholder.com/150", // placeholder image
  },
  {
    name: "John Doe",
    role: "Data Scientist",
    email: "johndoe@example.com",
    facebook: "https://facebook.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    image: "https://via.placeholder.com/150",
  },
  // Add more team members here
];

function Contact() {
  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans">
      <div className="mx-auto px-6 py-20">
        {/* Title */}
        <h1 className="text-4xl font-heading font-bold text-primary mb-10">
          Meet Our Team
        </h1>

        {/* Team Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-panel rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              {/* Profile Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-accent"
              />

              {/* Name + Role */}
              <h2 className="text-xl font-heading font-bold text-primary">
                {member.name}
              </h2>
              <p className="text-secondary mb-4">{member.role}</p>

              {/* Contact Links */}
              <div className="flex gap-4 text-accent">
                <a href={`mailto:${member.email}`} target="_blank">
                  <Mail size={20} />
                </a>
                <a href={member.facebook} target="_blank">
                  <Globe size={20} />
                </a>
                <a href={member.linkedin} target="_blank">
                  <Linkedin size={20} />
                </a>
                <a href={member.github} target="_blank">
                  <Github size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
