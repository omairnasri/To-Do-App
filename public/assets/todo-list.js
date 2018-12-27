$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data)       // 'success' is neccessary to prompt a post request to /todo. User entries are held in 'data' which is a request object.
        {      
          
          location.reload();          // Re-renders the todo.ejs template which will display updated array contents. 
        }
      });

    //   $.ajax({
    // method: 'POST',
    // url: "/todo",
    // data: todo
    // })

    // .done(function(data) 
    // {
    // location.reload();
    // });

      return false;

  });

  $('li').on('click', function()
  {

      var item = $(this).text().trim().replace(/ /g, "-");

      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data)
        {
          location.reload();
        }
      
      });
  });

});
