## Python Parameters

###### By - Cody Kochmann

###### Date - Fri Jul 10 10:47:52 2015

Parameters are basically python's version of function arguments. Their primary use is to send data to a function that it then will process and return the result of that data being applied to the code. When a parameter is passed to a function, it becomes a local variable for that function until the function completes its operation. 

For best practices (and in order to save yourself from debugging time), it's recommended that parameters are predefined in the functions headers in order to provide more customization to the functions logic in different uses.

The benefit of this is so you can have a block of code run for many different situations without having all of the logic that goes within an algorithm written multiple times in a program.

One example of this would be a function that calculates the angle between two points on a graph that contains the logic of the Pythagorean Theorem which could be later used like the line below. This use case is commonly found within code for two dimensional video games to calculate things such as bullet position.

```
angle_between_points(x1=1,y1=1,x2=7,y2=4) # returns angle between 1,1 and 7,4
```

Sometimes functions use parameters as settings for how the function will opperate as well. This way, you can have a single function perform different ways in order to not need to create multiple functions for different situations.

Example of a function using parameters both as processable data and settings.

```
def count_even_or_odd(input_array=[],even=False,odd=False):
  # counts even or odd numbers in an array
  # example usage:
  #   count_even_or_odd(test_array, even=True) 
  #   # returns count of even numbers in test_array
  count=0
  checker=0
  if even:
    checker=0
  elif odd:
    checker=1
  for i in input_array:
    if i % 2 is checker and i is not 0:
      count+=1
  return(count)

test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

print count_even_or_odd(test, even=True), "even"
# output: 5 even
print count_even_or_odd(test, odd=True), "odd"
# output: 6 odd

```
