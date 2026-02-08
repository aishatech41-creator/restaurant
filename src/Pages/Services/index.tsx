import { motion } from 'framer-motion';
import { 
  MdDeliveryDining, 
  MdRestaurantMenu, 
  MdEventAvailable, 
  MdRoomService,
  MdLocalOffer,
  MdSupportAgent 
} from 'react-icons/md';
import { Title } from '../../components/Sections';
import delivery from '../../img/delivery.png';

const Services = () => {
  const services = [
    {
      icon: MdDeliveryDining,
      title: "Fast Delivery",
      description: "Get your favorite meals delivered hot and fresh to your doorstep within 30 minutes. Track your order in real-time.",
      features: ["30-min delivery", "Real-time tracking", "Contactless delivery", "Temperature controlled"],
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: MdRestaurantMenu,
      title: "Dine-In Experience",
      description: "Enjoy our premium ambiance with exceptional table service. Reserve your table for a memorable dining experience.",
      features: ["Premium seating", "Live music", "Private dining rooms", "Complimentary WiFi"],
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: MdEventAvailable,
      title: "Event Catering",
      description: "Make your special occasions unforgettable with our professional catering services for any event size.",
      features: ["Custom menus", "Professional staff", "Event planning", "Flexible packages"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MdRoomService,
      title: "Private Chef",
      description: "Experience restaurant-quality meals in the comfort of your home with our private chef service.",
      features: ["Personalized menus", "In-home cooking", "Dietary accommodations", "Special occasions"],
      color: "from-orange-600 to-red-500"
    },
    {
      icon: MdLocalOffer,
      title: "Meal Subscriptions",
      description: "Subscribe to our weekly meal plans and enjoy exclusive discounts on your favorite dishes.",
      features: ["Weekly plans", "Up to 20% off", "Flexible scheduling", "Cancel anytime"],
      color: "from-amber-600 to-orange-600"
    },
    {
      icon: MdSupportAgent,
      title: "24/7 Support",
      description: "Our dedicated customer support team is always ready to assist you with any queries or concerns.",
      features: ["Round-the-clock support", "Multiple channels", "Quick response", "Order assistance"],
      color: "from-orange-500 to-amber-600"
    }
  ];

  const process = [
    { step: "01", title: "Browse Menu", description: "Explore our extensive menu with detailed descriptions and images" },
    { step: "02", title: "Place Order", description: "Add items to cart and customize your preferences" },
    { step: "03", title: "Secure Payment", description: "Choose from multiple secure payment options" },
    { step: "04", title: "Track & Enjoy", description: "Track your order in real-time and enjoy your meal" }
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
        <div className='max-w-6xl mx-auto text-center'>
          <Title title="Our Services" center />
          <p className='text-lightGray mt-8 text-lg leading-relaxed max-w-3xl mx-auto'>
            We offer a comprehensive range of services designed to bring exceptional culinary experiences 
            to you, wherever you are. From fast delivery to exclusive catering, we've got you covered.
          </p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className='w-full max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='bg-secondary rounded-2xl p-6 border border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group'
          >
            {/* Icon with gradient background */}
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <service.icon className='text-3xl text-white' />
            </div>

            {/* Title */}
            <h3 className='text-xl font-bold text-headingColor mb-3'>{service.title}</h3>

            {/* Description */}
            <p className='text-lightGray text-sm leading-relaxed mb-4'>{service.description}</p>

            {/* Features */}
            <ul className='space-y-2'>
              {service.features.map((feature, idx) => (
                <li key={idx} className='flex items-center gap-2 text-sm text-lightGray'>
                  <span className='w-1.5 h-1.5 rounded-full bg-accent'></span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Learn More Link */}
            <motion.button
              whileHover={{ x: 5 }}
              className='mt-4 text-accent text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300'
            >
              Learn More
              <span>→</span>
            </motion.button>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section className='w-full max-w-6xl mx-auto'>
        <Title title="How It Works" center />
        <div className='grid md:grid-cols-4 gap-6 mt-12'>
          {process.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative'
            >
              {/* Connector Line */}
              {index < process.length - 1 && (
                <div className='hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent -z-10'></div>
              )}

              <div className='bg-secondary rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-all duration-300 text-center'>
                {/* Step Number */}
                <div className='w-16 h-16 rounded-full bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary'>
                  {item.step}
                </div>

                {/* Title */}
                <h4 className='text-lg font-bold text-headingColor mb-2'>{item.title}</h4>

                {/* Description */}
                <p className='text-lightGray text-sm leading-relaxed'>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Delivery Feature Highlight */}
      <section className='w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title title="Lightning Fast Delivery" />
          <p className='text-lightGray mt-6 leading-relaxed mb-6'>
            Experience the convenience of having restaurant-quality meals delivered to your doorstep 
            in record time. Our advanced logistics system ensures your food arrives hot, fresh, and exactly as ordered.
          </p>
          
          <div className='space-y-4'>
            {[
              { label: "Average Delivery Time", value: "25 mins" },
              { label: "Delivery Success Rate", value: "99.8%" },
              { label: "Customer Satisfaction", value: "4.9/5" }
            ].map((stat, idx) => (
              <div key={idx} className='flex items-center justify-between bg-secondary rounded-lg p-4 border border-white/5'>
                <span className='text-lightGray'>{stat.label}</span>
                <span className='text-accent font-bold text-xl'>{stat.value}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-6 bg-accent text-primary font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-accent/50'
          >
            Order Now
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='relative'
        >
          <div className='bg-gradient-to-br from-accent/20 to-transparent rounded-2xl p-8 border border-accent/30'>
            <img 
              src={delivery} 
              alt="Fast Delivery" 
              className='w-full h-auto object-contain drop-shadow-2xl'
            />
          </div>
          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='absolute top-4 right-4 bg-accent text-primary font-bold px-4 py-2 rounded-full shadow-lg'
          >
            30 Min Delivery
          </motion.div>
        </motion.div>
      </section>

      {/* Special Offers */}
      <section className='w-full max-w-6xl mx-auto'>
        <Title title="Current Offers" center />
        <div className='grid md:grid-cols-3 gap-6 mt-12'>
          {[
            { title: "First Order", discount: "20% OFF", code: "FIRST20", description: "For new customers" },
            { title: "Weekend Special", discount: "15% OFF", code: "WEEKEND15", description: "Friday to Sunday" },
            { title: "Bulk Orders", discount: "25% OFF", code: "BULK25", description: "Orders above $100" }
          ].map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-gradient-to-br from-accent/20 to-transparent rounded-2xl p-6 border border-accent/30 text-center hover:shadow-lg hover:shadow-accent/20 transition-all duration-300'
            >
              <h4 className='text-lg font-bold text-headingColor mb-2'>{offer.title}</h4>
              <div className='text-4xl font-bold text-accent my-4'>{offer.discount}</div>
              <div className='bg-secondary rounded-lg px-4 py-2 inline-block mb-3'>
                <code className='text-accent font-mono'>{offer.code}</code>
              </div>
              <p className='text-lightGray text-sm'>{offer.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-4xl mx-auto bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl p-8 md:p-12 text-center border border-accent/30'
      >
        <h3 className='text-3xl font-bold text-headingColor mb-4'>Ready to Get Started?</h3>
        <p className='text-lightGray mb-6 max-w-2xl mx-auto'>
          Join thousands of satisfied customers enjoying our premium services. 
          Your next delicious meal is just a click away.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-accent text-primary font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-accent/50'
          >
            Browse Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-transparent border-2 border-accent text-accent font-bold px-8 py-3 rounded-lg hover:bg-accent hover:text-primary transition-all duration-300'
          >
            Contact Us
          </motion.button>
        </div>
      </motion.section>

    </div>
  );
}

export default Services;