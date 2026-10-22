from django.db import models

class Artwork(models.Model):
    CATEGORY_CHOICES = [
        ('original', 'Original Art'),
        ('fine-art', 'Fine Art'),
        ('interior', 'Home Interior'),
    ]
    
    FORMAT_CHOICES = [
        ('none', 'Inget (för original)'),
        ('kvadrat', 'Kvadratisk (50x50, 70x70, 100x100)'),
        ('rektangel', 'Rektangulär (30x40, 50x70, 80x100)'),
    ]

    title = models.CharField(max_length=200, verbose_name="Titel")
    description = models.TextField(blank=True, verbose_name="Description")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='original', verbose_name="Category")
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name="SEK Price")
    image_main = models.URLField(max_length=500, blank=True, verbose_name="Main image (Cloudinary-länk)")
    image_env = models.URLField(max_length=500, blank=True, verbose_name="Environment image (Cloudinary-länk)")
    image_detail = models.URLField(max_length=500, blank=True, verbose_name="Detail image (Cloudinary-länk)")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    is_sold = models.BooleanField(default=False, verbose_name="Sold")
    size = models.CharField(max_length=50, blank=True, verbose_name="Size")
    year = models.CharField(max_length=4, blank=True, verbose_name="Year of production")
    fine_art_format = models.CharField(max_length=20, choices=FORMAT_CHOICES, default='none', verbose_name="Fine Art Format")

    def __str__(self):
        return self.title   


# RÄTTAT: Flyttad helt till vänsterkant så det blir en egen, fristående databastabell
class Exhibition(models.Model):
    year = models.CharField(max_length=4, blank=True, verbose_name="Exhibition Year")
    image_main = models.URLField(max_length=500, blank=True, verbose_name="Main image (Cloudinary-länk)")
    gallery = models.CharField(max_length=150, verbose_name="Gallery")
    exhibtype = models.CharField(max_length=100, verbose_name="Type of Exhibition")
    arrangeby = models.CharField(max_length=150, verbose_name="Arrange by")
    # RÄTTAT: Ändrat verbose_name från "Gallery" till "Read More Link" så det inte krockar
    readmore = models.URLField(max_length=500, blank=True, verbose_name="Read More Link")

    class Meta:
        ordering = ['-year'] # Visar de senaste utställningarna högst upp!

    def __str__(self):
        return f"{self.year} - {self.gallery}"
