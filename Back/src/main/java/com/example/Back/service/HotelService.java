package com.example.Back.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.example.Back.dto.HotelDetailsDto;
import com.example.Back.dto.HotelDetailsResponse;
import com.example.Back.dto.HotelDto;
import com.example.Back.dto.HotelSearchResponse;
import com.example.Back.dto.RoomDto;
import com.example.Back.model.Hotel;
import com.example.Back.model.Room;
import com.example.Back.repository.HotelRepository;
import com.example.Back.repository.RoomRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public HotelSearchResponse getAll() {
        List<Hotel> results = hotelRepository.findAll();
        if (results.isEmpty()) {
            throw new EntityNotFoundException("Aucun hotel n'a ete trouve");
        }

        List<HotelDto> hotelDtos = results.stream()
                .map(this::toHotelDto)
                .toList();

        return new HotelSearchResponse(hotelDtos);
    }

    public HotelDetailsResponse get(Integer hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new EntityNotFoundException("Cet hotel n'existe pas"));

        List<RoomDto> roomDtos = roomRepository.findByHotelId(hotel.getId()).stream()
                .map(this::toRoomDto)
                .toList();

        JsonNode addInfo = readJson(hotel.getAddInfo());

        HotelDetailsDto hotelDto = HotelDetailsDto.builder()
                .id(hotel.getId())
                .title(readText(addInfo, "title", "Hotel " + hotel.getCity().getName()))
                .city(hotel.getCity().getName())
                .adress(hotel.getAdress())
                .stars(hotel.getStars())
                .imgPath(hotel.getImgPath())
                .summary(readText(addInfo, "summary", ""))
                .services(readTextList(addInfo, "services"))
                .rooms(roomDtos)
                .build();

        return new HotelDetailsResponse(hotelDto);
    }

    private HotelDto toHotelDto(Hotel hotel) {
        JsonNode addInfo = readJson(hotel.getAddInfo());
        List<Room> rooms = roomRepository.findByHotelId(hotel.getId());
        BigDecimal minPrice = rooms.stream().map(Room::getPricePerNight).filter(Objects::nonNull).min(Comparator.naturalOrder()).orElse(null);
        BigDecimal maxPrice = rooms.stream().map(Room::getPricePerNight).filter(Objects::nonNull).max(Comparator.naturalOrder()).orElse(null);

        return HotelDto.builder()
                .id(hotel.getId())
                .title(readText(addInfo, "title", "Hotel " + hotel.getCity().getName()))
                .city(hotel.getCity().getName())
                .adress(hotel.getAdress())
                .stars(hotel.getStars())
                .imgPath(hotel.getImgPath())
                .summary(readText(addInfo, "summary", ""))
                .services(readTextList(addInfo, "services"))
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .build();
    }

    private RoomDto toRoomDto(Room room) {
        JsonNode roomInfo = readJson(room.getStatham());

        return RoomDto.builder()
                .id(room.getId())
                .number(room.getNumber())
                .pricePerNight(room.getPricePerNight())
                .capacity(room.getCapacity())
                .title(readText(roomInfo, "title", ""))
                .summary(readText(roomInfo, "summary", ""))
                .imgPath(readText(roomInfo, "imgPath", ""))
            .highlights(readTextList(roomInfo, "highlights"))
                .build();
    }

    private JsonNode readJson(String value) {
        if (value == null || value.isBlank()) {
            return objectMapper.createObjectNode();
        }

        try {
            return objectMapper.readTree(value);
        } catch (Exception ex) {
            return objectMapper.createObjectNode();
        }
    }

    private String readText(JsonNode node, String fieldName, String fallback) {
        JsonNode value = node.get(fieldName);

        if (value == null || value.isNull()) {
            return fallback;
        }

        return value.asText();
    }

    private List<String> readTextList(JsonNode node, String fieldName) {
        JsonNode values = node.get(fieldName);

        if (values == null || !values.isArray()) {
            return List.of();
        }

        List<String> result = new ArrayList<>();

        values.forEach(value -> result.add(value.asText()));

        return result;
    }
}