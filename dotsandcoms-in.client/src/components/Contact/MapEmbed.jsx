export function MapEmbed() {
    return (
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 h-full min-h-[420px]">
            <iframe
                title="Dots and Coms  Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.9181287500332!2d73.13424797506998!3d22.31893587967317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9d06cb06b47%3A0xf88ebd89735878ae!2sDots%20%26%20Coms!5e0!3m2!1sen!2sin!4v1782710995864!5m2!1sen!2sin" width="100%"
                height="100%"
                style={{ border: 0, minHeight: 420 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}