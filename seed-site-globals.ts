import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from './payload.config'

async function seed() {
  console.log('🌱 Starting seed script for site globals and collections...')

  try {
    const payload = await getPayloadHMR({ config: configPromise })
    console.log('✅ Connected to Payload')

    // 1. Seed site-settings global
    console.log('📝 Seeding site-settings global...')
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        company: {
          name: 'IIS - Integrated Inspection Systems',
          legalName: 'Integrated Inspection Systems, Inc.',
          tagline: 'Engineering, Metrology, Machining & Database Services',
          description:
            'Founded in 1995, IIS has grown from a basement startup to an industry-leading provider of precision manufacturing, metrology, and engineering services. We specialize in data-driven manufacturing with our proprietary MetBase® software that creates closed-loop systems linking CMM inspection data to CNC machining.',
          foundingYear: '1995',
        },
        contact: {
          phone: '503-231-9093',
          email: 'officemgr@iismet.com',
          address: '14310 SE Industrial Way\nClackamas, OR 97015',
          city: 'Clackamas',
          state: 'Oregon',
          zip: '97015',
          country: 'United States',
        },
        social: {
          linkedin: 'https://www.linkedin.com/company/integrated-inspection-systems',
          twitter: 'https://twitter.com/iismet',
          facebook: 'https://www.facebook.com/iisprecision',
          twitterHandle: '@iisprecision',
        },
        seo: {
          defaultTitle: 'IIS - Integrated Inspection Systems | Precision Manufacturing & Metrology',
          defaultDescription:
            'AS9100 & ISO 9001 certified precision machining, CMM inspection, and first article inspection services. Proprietary MetBase® software for closed-loop data integration. ITAR registered. Serving aerospace, defense & manufacturing since 1995.',
          defaultKeywords:
            'CMM inspection services, AS9100 certified, ISO 9001, ITAR registered, first article inspection, precision machining Oregon, dimensional inspection, coordinate measuring, MetBase software, aerospace machining, defense manufacturing',
          googleAnalyticsId: '',
          googleVerificationCode: '',
        },
      },
    })
    console.log('✅ site-settings global seeded successfully')

    // 2. Seed ui-text global
    console.log('📝 Seeding ui-text global...')
    await payload.updateGlobal({
      slug: 'ui-text',
      data: {
        buttons: {
          getQuote: 'Get Quote',
          contactUs: 'Contact Us Today',
          viewServices: 'View Our Services',
          viewIndustries: 'Explore Industries',
          learnMore: 'Learn More',
        },
        sections: {
          ctaHeading: 'Ready to Get Started?',
          ctaDescription:
            'From prototype to production, we deliver AS9100D-certified precision components with tolerances to ±0.0001" for aerospace, defense, and medical applications.',
          serviceOfferings: 'Our Service Offerings',
          ourCapabilities: 'Technical Capabilities',
        },
      },
    })
    console.log('✅ ui-text global seeded successfully')

    // 3. Seed team-members collection
    console.log('📝 Seeding team-members collection...')

    const teamMembers = [
      {
        name: 'John Smith',
        title: 'President & CEO',
        bio: 'With over 30 years of experience in precision manufacturing and metrology, John founded IIS in 1995 with a vision to revolutionize data-driven manufacturing. Under his leadership, IIS has grown from a basement startup to an industry leader serving aerospace, defense, and advanced manufacturing sectors.',
        order: 1,
        linkedin: 'https://www.linkedin.com/in/johnsmith',
        email: 'jsmith@iismet.com',
      },
      {
        name: 'Sarah Johnson',
        title: 'VP of Engineering',
        bio: 'Sarah brings 20+ years of aerospace engineering expertise to IIS. She leads our engineering team in developing innovative manufacturing solutions and overseeing quality assurance programs. Her expertise in GD&T and process optimization has been instrumental in achieving our AS9100 certification.',
        order: 2,
        linkedin: 'https://www.linkedin.com/in/sarahjohnson',
        email: 'sjohnson@iismet.com',
      },
      {
        name: 'Michael Chen',
        title: 'Director of Metrology',
        bio: 'Michael is a certified metrology professional with extensive experience in CMM inspection and dimensional analysis. He oversees our state-of-the-art metrology lab and leads the development of our proprietary MetBase® software that integrates inspection data with manufacturing processes.',
        order: 3,
        linkedin: 'https://www.linkedin.com/in/michaelchen',
        email: 'mchen@iismet.com',
      },
      {
        name: 'Emily Rodriguez',
        title: 'Operations Manager',
        bio: 'Emily manages day-to-day operations at IIS, ensuring seamless coordination between machining, inspection, and customer service teams. With a background in lean manufacturing and process improvement, she has implemented systems that enhance efficiency while maintaining our rigorous quality standards.',
        order: 4,
        linkedin: 'https://www.linkedin.com/in/emilyrodriguez',
        email: 'erodriguez@iismet.com',
      },
    ]

    for (const member of teamMembers) {
      await payload.create({
        collection: 'team-members',
        data: member,
      })
    }
    console.log(`✅ ${teamMembers.length} team members seeded successfully`)

    // 4. Update homepage global with enhanced hero data
    console.log('📝 Updating homepage global with enhanced hero...')
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        heroEnhanced: {
          mainTitle: 'PRECISION MANUFACTURING',
          subtitle: 'SERVICES',
          tagline: 'Engineering, Metrology, Machining & Database Services since 1995',
          badges: [
            { text: 'AS9100D Certified' },
            { text: 'ISO 9001:2015' },
            { text: 'ITAR Registered' },
            { text: '24/7 Production' },
          ],
        },
      },
    })
    console.log('✅ homepage global enhanced hero seeded successfully')

    console.log('')
    console.log('🎉 Seed script completed successfully!')
    console.log('')
    console.log('Summary:')
    console.log('  ✓ site-settings global created')
    console.log('  ✓ ui-text global created')
    console.log(`  ✓ ${teamMembers.length} team members created`)
    console.log('  ✓ homepage enhanced hero updated')
    console.log('')
    console.log('Next steps:')
    console.log('  1. Log in to the admin panel at /admin')
    console.log('  2. Review and customize the seeded content')
    console.log('  3. Upload team member photos')
    console.log('  4. Add hero slide images')
    console.log('')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }

  process.exit(0)
}

seed()
