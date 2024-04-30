document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchUsers();
  });
  
  async function fetchProducts() {
    try {
      const response = await fetch('http://your-backend-api-url/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              products {
                id
                name
                sku
                description
                quantity
              }
            }
          `
        })
      });
      const data = await response.json();
      const products = data.data.products;
      displayProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  async function fetchUsers() {
    try {
      const response = await fetch('http://your-backend-api-url/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              users {
                id
                email
                firstName
                lastName
                address
              }
            }
          `
        })
      });
      const data = await response.json();
      const users = data.data.users;
      displayUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  function displayProducts(products) {
    const productList = document.getElementById('product-list');
  
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.sku}</td>
        <td>${product.description}</td>
        <td>${product.quantity}</td>
      `;
      productList.appendChild(row);
    });
  }
  
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
  
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.email}</td>
        <td>${user.firstName || '-'}</td>
        <td>${user.lastName || '-'}</td>
        <td>${user.address || '-'}</td>
      `;
      userList.appendChild(row);
    });
  }  