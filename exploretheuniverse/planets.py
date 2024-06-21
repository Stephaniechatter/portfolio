# Python script to generate planet HTML pages from template

import os

# List of planets and their descriptions
planets = [
    {"name": "Mercury", "image": "mercury.jpg", "description": "Description of Mercury."},
    {"name": "Venus", "image": "venus.jpg", "description": "Description of Venus."},
    {"name": "Earth", "image": "earth.jpg", "description": "Description of Earth."},
    {"name": "Mars", "image": "mars.jpg", "description": "Description of Mars."},
    {"name": "Jupiter", "image": "jupiter.jpg", "description": "Description of Jupiter."},
    {"name": "Saturn", "image": "saturn.jpg", "description": "Description of Saturn."},
    {"name": "Uranus", "image": "uranus.jpg", "description": "Description of Uranus."},
    {"name": "Neptune", "image": "neptune.jpg", "description": "Description of Neptune."}
]

# Read template HTML file
with open('template.html', 'r') as file:
    template_content = file.read()

# Create individual HTML files for each planet
for planet in planets:
    # Replace placeholders with actual content
    html_content = template_content.replace('PlanetName', planet['name'])
    html_content = html_content.replace('images/planet-name.jpg', f'images/{planet["image"]}')
    html_content = html_content.replace('DescriptionPlaceholder', planet['description'])

    # Write content to a new HTML file
    filename = f'{planet["name"].lower()}.html'
    with open(filename, 'w') as file:
        file.write(html_content)

    print(f'Created {filename}')

print('HTML generation complete.')
