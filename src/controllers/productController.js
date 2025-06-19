//-------------------------------------------------------------------- PRODUCTS CONTROLLER -------------------------------------------------------------------------------------------

function showProducts(req, res) {
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return res.status(500).send('Error al conectar a la base de datos');
      }
  
      conn.query('SELECT * FROM products', (err, rows) => {
        if (err) {
          console.error('Error al obtener los productos:', err);
          return res.status(500).send('Error al obtener los productos');
        }
  
        const products = rows; // Almacenar los productos en la variable "products"
        console.log(products); // Mostrar los productos en la consola (opcional)
        
        res.render('products', { name: req.session.name, products: products });
    });
    });
  }

  function search(req, res) {
    const searchTerm = req.query.query;
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return res.status(500).send('Error al conectar a la base de datos');
      }
  
      conn.query('SELECT * FROM products WHERE name LIKE ?', [`%${searchTerm}%`], (err, rows) => {
        if (err) {
          console.error('Error al obtener los productos:', err);
          return res.status(500).send('Error al obtener los productos');
        }
  
        const products = rows; // Almacenar los productos en la variable "products"
        //console.log(products); // Mostrar los productos en la consola (opcional)
  
        res.render('products', { name: req.session.name, products: products });
      });
    });
  }

  function decreaseQuantity(req, res) {
    const productId = req.params.productId;
  
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return res.status(500).send('Error al conectar a la base de datos');
      }
  
      // Obtener la cantidad actual del producto desde la base de datos
      conn.query('SELECT quantify FROM products WHERE id = ?', [productId], (err, rows) => {
        if (err) {
          console.error('Error al obtener la cantidad del producto:', err);
          return res.status(500).send('Error al obtener la cantidad del producto');
        }
  
        const currentQuantity = isNaN(rows[0].quantify) ? 0 : parseInt(rows[0].quantify);
  
        if (currentQuantity <= 0) {
          return res.send('No se puede disminuir más la cantidad del producto');
        }
  
        const newQuantity = currentQuantity - 1;
  
        // Actualizar la cantidad del producto en la base de datos
        conn.query('UPDATE products SET quantify = ? WHERE id = ?', [newQuantity, productId], (err) => {
          if (err) {
            console.error('Error al actualizar la cantidad del producto:', err);
            return res.status(500).send('Error al actualizar la cantidad del producto');
          }
  
          // Aquí puedes realizar cualquier acción adicional, como redirigir al usuario a la página de productos o mostrar un mensaje de éxito.
          res.send('Cantidad del producto disminuida exitosamente');
        });
      });
    });
  }
  
  
  function increaseQuantity(req, res) {
    const productId = req.params.productId;
  
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return res.status(500).send('Error al conectar a la base de datos');
      }
  
      // Obtener la cantidad actual del producto desde la base de datos
      conn.query('SELECT quantify FROM products WHERE id = ?', [productId], (err, rows) => {
        if (err) {
          console.error('Error al obtener la cantidad del producto:', err);
          return res.status(500).send('Error al obtener la cantidad del producto');
        }
  
        const currentQuantity = isNaN(rows[0].quantify) ? 0 : parseInt(rows[0].quantify);
        const newQuantity = currentQuantity + 1;
  
        // Restar 1 a la cantidad actual si es mayor que 0
        const finalQuantity = Math.max(newQuantity - 1, 0);
  
        // Actualizar la cantidad del producto en la base de datos
        conn.query('UPDATE products SET quantify = ? WHERE id = ?', [finalQuantity, productId], (err) => {
          if (err) {
            console.error('Error al actualizar la cantidad del producto:', err);
            return res.status(500).send('Error al actualizar la cantidad del producto');
          }
  
          // Aquí puedes realizar cualquier acción adicional, como redirigir al usuario a la página de productos o mostrar un mensaje de éxito.
          res.send('Cantidad del producto aumentada exitosamente');
        });
      });
    });
  }
  

  function addToCart(req, res) {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return res.status(500).send('Error al conectar a la base de datos');
      }
  
      // Verificar la disponibilidad del producto y obtener su información
      conn.query('SELECT * FROM products WHERE id = ?', [productId], (err, rows) => {
        if (err) {
          console.error('Error al obtener información del producto:', err);
          return res.status(500).send('Error al obtener información del producto');
        }
  
        // Verificar si el producto existe y está disponible
        if (rows.length === 0 || rows[0].quantity === 0) {
          return res.status(400).send('El producto no está disponible');
        }
  
        const product = rows[0];
  
        // Agregar el producto al carrito en la base de datos
        const cartItem = {
          user_id: req.session.userId,
          product_id: productId,
          quantity: quantity
        };
  
        conn.query('INSERT INTO cart_products SET ?', cartItem, (err, result) => {
          if (err) {
            console.error('Error al agregar el producto al carrito:', err);
            return res.status(500).send('Error al agregar el producto al carrito');
          }
  
          console.log('Producto agregado al carrito:', productId);
          // Aquí puedes realizar cualquier acción adicional, como redirigir al usuario a la página del carrito o mostrar un mensaje de éxito.
          res.redirect('/cart');
        });
      });
    });
  }


  
  module.exports = {
    showProducts: showProducts,
    search: search,
    decreaseQuantity: decreaseQuantity,
    increaseQuantity: increaseQuantity,
    addToCart: addToCart,
  };
