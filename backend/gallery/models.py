from django.db import models
from taggit.managers import TaggableManager

class Artwork(models.Model):
    CATEGORY_CHOICES = [
        ('original', 'Original Art'),
        ('fine-art', 'Fine Art'),
        ('interior', 'Home Interior'),
    ]
    
    ORIENTATION_CHOICES = [
        ('horizontal', 'Horizontal'),
        ('square', 'Square'),
        ('vertical', 'Vertical'),
    ]
    
    SIZE_CHOICES = [
        ('none', 'Inget (för original)'),
        ('square', 'square (50x50, 70x70, 100x100)'),
        ('horizontal', 'Horizontal (30x40, 50x70, 80x100)'),
        ('vertical', 'Vertical(30x40, 50x70, 80x100)'),
    ]

    STYLE_CHOICES = [
        ('abstract', 'Abstract'),
        ('landscape', 'Landscape'),
        ('faces', 'Faces'),
        ('animals', 'Animals'),
        ('figurative', 'Figurative'),
        ('portraiture', 'Portraiture'),
        ('commission', 'Commission'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200, verbose_name="Titel")
    description = models.TextField(blank=True, verbose_name="Description")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='original', verbose_name="Category")
    style = models.CharField(max_length=20, choices=STYLE_CHOICES, default='abstract', verbose_name="Style")
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name="SEK Price")
    
    image_main = models.URLField(max_length=500, blank=True, verbose_name="Main image (Cloudinary-länk)")
    image_env = models.URLField(max_length=500, blank=True, verbose_name="Environment image (Cloudinary-länk)")
    image_detail = models.URLField(max_length=500, blank=True, verbose_name="Detail image (Cloudinary-länk)")
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Year Created")
    is_sold = models.BooleanField(default=False, verbose_name="Sold")
    orientation = models.CharField(max_length=20, choices=ORIENTATION_CHOICES, default='square', verbose_name="Orientation")
    
    # Ändrat max_digits från 3 till 6 så att mått över 9 cm (t.ex. 100.50 cm) fungerar utan krasch
    width = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True, verbose_name="Width (in cm)")
    height = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True, verbose_name="Height (in cm)")
    size = models.CharField(max_length=50, choices=SIZE_CHOICES, blank=True, verbose_name="Size")
    
    # Taggarna tillåts vara tomma i adminpaneler tack vare blank=True
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.title


class Exhibition(models.Model):
    year = models.CharField(max_length=4, blank=True, verbose_name="Exhibition Year")
    image_main = models.URLField(max_length=500, blank=True, verbose_name="Main image (Cloudinary-länk)")
    gallery = models.CharField(max_length=150, verbose_name="Gallery")
    exhibtype = models.CharField(max_length=100, verbose_name="Type of Exhibition")
    arrangeby = models.CharField(max_length=150, verbose_name="Arrange by")
    readmore = models.URLField(max_length=500, blank=True, verbose_name="Read More Link")

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return f"{self.year} - {self.gallery}"
