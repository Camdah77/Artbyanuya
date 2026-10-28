from rest_framework import serializers
# RÄTTAT: Ändrat till TaggitSerializer (med t i mitten, inte able)
from taggit.serializers import (TagListSerializerField, TaggitSerializer)
from .models import Artwork, Exhibition

# RÄTTAT: Ändrat basklassens namn här också
class ArtworkSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Artwork
        fields = [
            'id', 'title', 'description', 'category', 'style', 
            'price', 'image_main', 'image_env', 'image_detail', 
            'created_at', 'is_sold', 'orientation', 'width', 
            'height', 'size', 'tags'
        ]

class ExhibitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibition
        fields = ['id', 'year', 'image_main', 'gallery', 'exhibtype', 'arrangeby', 'readmore']
