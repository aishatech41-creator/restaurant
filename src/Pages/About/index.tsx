import { motion } from 'framer-motion';
import { MdRestaurant, MdStar, MdLocalShipping, MdPeople } from 'react-icons/md';
import { Title } from '../../components/Sections';
import chef1 from '../../img/chef1.png';
import cheff from '../../img/cheff.png';

const About = () => {
  const stats = [
    { icon: MdRestaurant, value: "500+", label: "Dishes Served Daily" },
    { icon: MdStar, value: "4.9", label: "Average Rating" },
    { icon: MdLocalShipping, value: "1000+", label: "Deliveries Monthly" },
    { icon: MdPeople, value: "50K+", label: "Happy Customers" },
  ];

  const values = [
    {
      title: "Quality First",
      description: "We source only the finest ingredients, ensuring every dish meets our premium standards.",
      icon: "🌟"
    },
    {
      title: "Authentic Flavors",
      description: "Traditional recipes passed down through generations, prepared with modern culinary techniques.",
      icon: "👨‍🍳"
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We go above and beyond to exceed expectations.",
      icon: "❤️"
    },
    {
      title: "Sustainability",
      description: "Committed to eco-friendly practices and supporting local farmers and suppliers.",
      icon: "🌱"
    }
  ];

  return (
    <div className='flex w-full h-auto flex-col items-center justify-center gap-16 pb-16'>
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full bg-gradient-to-br from-secondary via-primary to-secondary rounded-2xl p-8 md:p-16 shadow-premium'
      >
        <div className='max-w-6xl mx-auto'>
          <Title title="Our Story" center />
          <p className='text-lightGray text-center mt-8 text-lg leading-relaxed max-w-4xl mx-auto'>
            Founded with a passion for exceptional cuisine, <span className='text-accent font-semibold'>Kuka Exclusive</span> has been 
            serving culinary excellence since our inception. We believe that great food brings people together, 
            creating memories that last a lifetime.
          </p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className='w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='bg-secondary rounded-xl p-6 flex flex-col items-center gap-3 hover:bg-secondary/80 transition-all duration-300 border border-white/5 hover:border-accent/30'
          >
            <stat.icon className='text-4xl text-accent' />
            <h3 className='text-3xl font-bold text-headingColor'>{stat.value}</h3>
            <p className='text-sm text-lightGray text-center'>{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Mission & Vision */}
      <section className='w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-secondary rounded-2xl p-8 border border-white/5 hover:border-accent/30 transition-all duration-300'
        >
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center'>
              <span className='text-2xl'>🎯</span>
            </div>
            <h3 className='text-2xl font-bold text-headingColor'>Our Mission</h3>
          </div>
          <p className='text-lightGray leading-relaxed'>
            To deliver exceptional dining experiences through innovative cuisine, outstanding service, 
            and a commitment to quality that exceeds expectations. We strive to be more than just a restaurant—we're 
            a destination where food, culture, and community come together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-secondary rounded-2xl p-8 border border-white/5 hover:border-accent/30 transition-all duration-300'
        >
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center'>
              <span className='text-2xl'>👁️</span>
            </div>
            <h3 className='text-2xl font-bold text-headingColor'>Our Vision</h3>
          </div>
          <p className='text-lightGray leading-relaxed'>
            To become the leading culinary destination, recognized for our innovation, sustainability, 
            and unwavering dedication to excellence. We envision a future where every meal we serve creates 
            lasting memories and brings joy to our customers' lives.
          </p>
        </motion.div>
      </section>

      {/* Our Values */}
      <section className='w-full max-w-6xl mx-auto'>
        <Title title="Our Core Values" center />
        <div className='grid md:grid-cols-2 gap-6 mt-12'>
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-secondary rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10'
            >
              <div className='flex items-start gap-4'>
                <span className='text-4xl'>{value.icon}</span>
                <div>
                  <h4 className='text-xl font-bold text-headingColor mb-2'>{value.title}</h4>
                  <p className='text-lightGray text-sm leading-relaxed'>{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className='w-full max-w-6xl mx-auto'>
        <Title title="Meet Our Chefs" center />
        <div className='grid md:grid-cols-2 gap-8 mt-12'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className='bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 group'
          >
            <div className='h-64 overflow-hidden bg-gradient-to-br from-accent/20 to-transparent'>
              <img 
                src={chef1} 
                alt="Head Chef" 
                className='w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500'
              />
            </div>
            <div className='p-6'>
              <h4 className='text-2xl font-bold text-headingColor mb-2'>Chef Marcus Johnson</h4>
              <p className='text-accent text-sm mb-3'>Executive Head Chef</p>
              <p className='text-lightGray text-sm leading-relaxed'>
                With over 15 years of culinary expertise, Chef Marcus brings innovation and passion to every dish, 
                blending traditional techniques with modern gastronomy.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 group'
          >
            <div className='h-64 overflow-hidden bg-gradient-to-br from-accent/20 to-transparent'>
              <img 
                src={cheff} 
                alt="Pastry Chef" 
                className='w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500'
              />
            </div>
            <div className='p-6'>
              <h4 className='text-2xl font-bold text-headingColor mb-2'>Chef Sarah Williams</h4>
              <p className='text-accent text-sm mb-3'>Pastry Chef & Dessert Specialist</p>
              <p className='text-lightGray text-sm leading-relaxed'>
                Award-winning pastry chef with a flair for creating stunning desserts that are as beautiful 
                as they are delicious. Every creation is a work of art.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-4xl mx-auto bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl p-8 md:p-12 text-center border border-accent/30'
      >
        <h3 className='text-3xl font-bold text-headingColor mb-4'>Experience the Difference</h3>
        <p className='text-lightGray mb-6 max-w-2xl mx-auto'>
          Join thousands of satisfied customers who have made us their favorite dining destination. 
          Your culinary journey begins here.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='bg-accent text-primary font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-accent/50'
        >
          Order Now
        </motion.button>
      </motion.section>

    </div>
  );
}

export default About;