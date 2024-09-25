import React, { useEffect, useState } from 'react';
import './featured_products.css';
import Icon from '../../icon/Vector.svg';

function Featured_products() {
  const [products, setProducts] = useState([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const fetchProducts = async () => {
    const query = `
      {
        products(first: 10) {
          edges {
            node {
              title
              description
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              images(first: 2) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://tsodykteststore.myshopify.com/api/2023-01/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '7e174585a317d187255660745da44cc7',
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    setProducts(data.data.products.edges);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const accordion = [
    { text: "How can I track my order?", answer: "Once your order has been shipped, you will receive a tracking number by email. You can use this tracking number to track the progress of your shipment online." },
    { text: "What is the delivery time of my order?", answer: "Once your order has been shipped, you will receive a tracking number by email. You can use this tracking number to track the progress of your shipment online." },
    { text: "How can I return my product?", answer: "Once your order has been shipped, you will receive a tracking number by email. You can use this tracking number to track the progress of your shipment online." },
    { text: "What are the shipping costs for my order?", answer: "Once your order has been shipped, you will receive a tracking number by email. You can use this tracking number to track the progress of your shipment online." },
    { text: "Can I change or cancel my order after placing it?", answer: "Once your order has been shipped, you will receive a tracking number by email. You can use this tracking number to track the progress of your shipment online." },
    { text: "What is delivery time of my order? ", answer: "Once your order has been shipped, you will receive a tracking number by email. You can use this tracking number to track the progress of your shipment online." }
  ];

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <div>
      <header>
        <h1>Featured products</h1>
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit lectus cursus phasellus ridiculus nostra fames. Sollicitudin mi facilisi congue tellus<br />
          dictumst eu ligula arcu. Vivamus luctus vel duis tempor curabitur potenti rhoncus. Orci dictum et varius feugiat pulvinar euismod iaculis diam. Lacus<br />
          inceptos vel fusce interdum molestie luctus cubilia.
        </p>
      </header>

      <section className="products-section">
        {products.length > 0 ? (
          <div className="products-container">
            {products.map(({ node }) => (
              <div key={node.title} className="product-container">
                <div className="product-card">
                  <img className="product-image" src={node.images.edges[0].node.url} alt={node.images.edges[0].node.altText} />
                  {node.images.edges[1] && (
                    <img className="product-image-hover" src={node.images.edges[1].node.url} alt={node.images.edges[1].node.altText} />
                  )}
                </div>
                <h3>{node.title}</h3>
                <p>{node.variants.edges[0].node.price.amount} {node.variants.edges[0].node.price.currencyCode}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading products...</p>
        )}
      </section>

      <section className="faq-accordion-section">
        <div className='footer'>
          <h1>Frequently asked questions</h1>
          <p className="faq-subtitle">Can’t find the answer you’re looking for? Reach out to<br /> our <span>customer support</span> team.</p>
        </div>

        <section className="accordion-section">
          {accordion.map((item, index) => (
            <div key={index} className={`accordion-item ${openAccordionIndex === index ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                <h1>{item.text}</h1>
                <img src={Icon} alt="icon" className={`accordion-icon ${openAccordionIndex === index ? 'open' : ''}`} />
              </div>
              {openAccordionIndex === index && (
                <div className="accordion-content">
                  <p>{item.answer}</p> 
                </div>
              )}
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Featured_products;
