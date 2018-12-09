color [] yellows = {#96f9ff, #89ffee, #91ffd3, #abffb2, #cfff8f, #f9f871, #f9f871, #f9f871, #FFE171, #FFCA80};
color [] greys = {#f8f9fa, #f1f3f5, #e9ecef, #dee2e6, #ced4da, #adb5bd, #868e96, #495057, #343a40, #212529};

PVector center;
Table table;
int [] counter;

void setup() {
  size(800, 800);
  center = new PVector(width/2, height/2);
  table = loadTable("export.csv", "header");
  
  counter = new int [table.getRowCount()];
  for (TableRow row : table.rows()) {
    int edge = row.getInt("edge");
    for (int i = 1; i < edge; i++)
      counter[row.getInt("vertex" + i)]++;
  }
}

void draw() {
  background(0);  
  int index = 0;
  
  for (TableRow row : table.rows()) {
    int edge = row.getInt("edge");
    boolean isConnected = (row.getString("isConnected").equalsIgnoreCase("TRUE"));
    int [] vertice = new int [edge];
    
    vertice[0] = row.getInt("id");
    for (int i = 1; i < edge; i++)
      vertice[i] = row.getInt("vertex" + i);
    
    // visualize edges and vertice
    visualize(index, edge, vertice, isConnected);
    
    index++;
  }
  // visualize myself in the center
  drawMyself();
  
  save("assignment4.png");
}

void drawMyself() {
  noStroke();
  fill(yellows[3], 230);
  ellipse(center.x, center.y, 10 * 3, 10 * 3);
}

void visualize(int index, int edge, int [] vertice, boolean isConnected) {
  int circleRadius, space = 80;
  int radius = space + 50 * (edge - 1);
  
  // index => angle
  float angle = 360 / table.getRowCount() * index;
  
  // isConnected => stroke color
  stroke(yellows[1], 70);
  
  if (!isConnected) {
    radius += 3 * space;
    stroke(greys[0], 40);
  }
  
  // draw edge
  float x = cos(radians(angle)) * radius;
  float y = sin(radians(angle)) * radius;
  float otherX = 0; //cos(radians(angle)) * space;
  float otherY = 0; //sin(radians(angle)) * space;
  line(x + center.x, y + center.y, otherX + center.x, otherY + center.y);
  
  // draw vertex
  for (int i = 0; i < vertice.length; i++) {
    radius = space + 50 * i;
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    
    // counter => size
    int count = counter[vertice[i]];
    circleRadius = count * 3 - 2;
    
    // i => color
    noStroke();
    color fillColor = (isConnected) ? yellows[9 - count] : greys[9 - count];
    fill(fillColor, 100); // yellows[9 - counter[vertice[i]]]
    
    if (i == vertice.length - 1 && isConnected) {
      fill(yellows[3], 230);
      circleRadius = 4;
    }
    
    ellipse(x + center.x, y + center.y, circleRadius, circleRadius);
  }
}
